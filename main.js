// SYNAPSE COSMOS v1.0 - Full 360° x 360° Unconstrained 3D Camera Unlock
// (Rest of main.js logic preserved, only camera pitch clamp removed)

// --- CAMERA INPUT HANDLER (MODIFIED) ---
// Previous: camPitch = Math.max(-1.3, Math.min(1.3, camPitch + dy * 0.008));
// New: Full unconstrained pitch & yaw orbital tumbling

let camPitch = 0.785398; // 45° default isometric
let camYaw = 0.0;

function updateCameraOrbit(dx, dy) {
    camYaw += dx * 0.008;   // Full 360° azimuthal yaw (wraps around naturally)
    camPitch += dy * 0.008; // Full 360° polar pitch (no clamp, full spherical tumble)
}

function resetCamera() {
    camPitch = 0.785398; // Snap back to 45° isometric
    camYaw = 0.0;
}

// Keyboard handler addition:
// if (e.key === 'c' || e.key === 'C') resetCamera();
