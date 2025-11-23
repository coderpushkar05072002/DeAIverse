// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ComputeMarket is Ownable {
    enum TaskStatus { Created, Accepted, Running, Submitted, Verified, Cancelled }

    struct Task {
        uint256 id;
        address consumer;
        address provider;
        uint256 price; // in token decimals
        TaskStatus status;
        string datasetCID;
        string resultCID;
        uint256 deadline;
    }

    IERC20 public paymentToken;
    uint256 public nextTaskId;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 indexed id, address consumer, uint256 price, string datasetCID);
    event TaskAccepted(uint256 indexed id, address provider);
    event TaskSubmitted(uint256 indexed id, string resultCID);
    event TaskVerified(uint256 indexed id);

    constructor(address tokenAddress) {
        paymentToken = IERC20(tokenAddress);
    }

    function createTask(uint256 price, string memory datasetCID, uint256 deadline) external returns (uint256) {
        nextTaskId++;
        uint256 tid = nextTaskId;
        tasks[tid] = Task({
            id: tid,
            consumer: msg.sender,
            provider: address(0),
            price: price,
            status: TaskStatus.Created,
            datasetCID: datasetCID,
            resultCID: "",
            deadline: deadline
        });

        // pull payment into escrow
        require(paymentToken.transferFrom(msg.sender, address(this), price), "Payment failed");

        emit TaskCreated(tid, msg.sender, price, datasetCID);
        return tid;
    }

    function acceptTask(uint256 taskId) external {
        Task storage t = tasks[taskId];
        require(t.status == TaskStatus.Created, "Task not open");
        t.provider = msg.sender;
        t.status = TaskStatus.Accepted;
        emit TaskAccepted(taskId, msg.sender);
    }

    function startTask(uint256 taskId) external {
        Task storage t = tasks[taskId];
        require(t.provider == msg.sender, "Not provider");
        require(t.status == TaskStatus.Accepted, "Task not accepted");
        t.status = TaskStatus.Running;
    }

    function submitResult(uint256 taskId, string memory resultCID) external {
        Task storage t = tasks[taskId];
        require(t.provider == msg.sender, "Not provider");
        require(t.status == TaskStatus.Running, "Not running");
        t.resultCID = resultCID;
        t.status = TaskStatus.Submitted;
        emit TaskSubmitted(taskId, resultCID);
    }

    // consumer calls to verify (simple approach). Advanced: oracle-based verification
    function verifyAndRelease(uint256 taskId, bool ok) external {
        Task storage t = tasks[taskId];
        require(msg.sender == t.consumer, "Only consumer can verify");
        require(t.status == TaskStatus.Submitted, "Not submitted");
        if (ok) {
            // release tokens to provider
            require(paymentToken.transfer(t.provider, t.price), "Transfer failed");
            t.status = TaskStatus.Verified;
            emit TaskVerified(taskId);
        } else {
            // refund
            require(paymentToken.transfer(t.consumer, t.price), "Refund failed");
            t.status = TaskStatus.Cancelled;
        }
    }

    // emergency function: owner can withdraw tokens (admin only)
    function emergencyWithdraw(address to, uint256 amount) external onlyOwner {
        paymentToken.transfer(to, amount);
    }
}