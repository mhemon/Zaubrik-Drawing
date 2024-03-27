import { Tldraw, TLShape, TLUiComponents } from "@tldraw/tldraw";
import { SimController } from "@/physics/PhysicsControls";
import { HTMLShapeUtil } from "@/shapes/HTMLShapeUtil";
import ShareBtn from "./ShareBtn";
import React, { useRef } from 'react';

const components: TLUiComponents = {
  HelpMenu: null,
  StylePanel: null,
  PageMenu: null,
  NavigationPanel: null,
  DebugMenu: null,
  ContextMenu: null,
  ActionsMenu: null,
  QuickActions: null,
  MainMenu: null,
  MenuPanel: null,
}

export function Canvas({ shapes }: { shapes: TLShape[]; }) {
  const tldrawRef = useRef<Tldraw | null>(null);

  const exportAsImage = () => {
    if (tldrawRef.current && tldrawRef.current.export) {
      tldrawRef.current.export(/* specify export options if needed */)
        .then((imageBlob: Blob) => {
          // Handle the exported image blob
          const imageUrl = URL.createObjectURL(imageBlob);
          // Now you can share the imageUrl or update ShareBtn component state
          return imageUrl
        })
        .catch((error: Error) => {
          console.error('Error exporting canvas:', error);
        });
    } else {
      console.error('Tldraw component or export method is undefined');
    }
  };

  return (
    <div className="tldraw__editor">
      <Tldraw
        components={components}
        shapeUtils={[HTMLShapeUtil]}
        onMount={(tldraw: Tldraw) => {
          tldrawRef.current = tldraw; // Store the Tldraw component reference
          window.dispatchEvent(new CustomEvent('editorDidMountEvent'));
        }}
      >
        <SimController shapes={shapes} />
      </Tldraw>
      <ShareBtn exportAsImage={exportAsImage} />
    </div>
  );
}
