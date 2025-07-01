import '@google/model-viewer';

export function ObjModel() {
    return (
        <model-viewer
            src="/model.gbl"
            alt="A 3D model"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '500px' }}
        />
    )
}