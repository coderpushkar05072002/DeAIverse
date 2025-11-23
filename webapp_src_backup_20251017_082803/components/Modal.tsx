import { createPortal } from "react-dom";
import { Button } from "./Button";

type ModalProps = {
  open: boolean; title?: string; onClose: ()=>void; children: React.ReactNode; footer?: React.ReactNode;
};

export function Modal({open, title, onClose, children, footer}: ModalProps){
  if(!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="card w-full max-w-lg" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-5 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
