# Proposed delivery contract for replacement assets

## Status

This contract describes what to produce for the next integration pass. The current game builds its visuals in `src/assets.js` and `src/main.js`; it **does not currently load GLB replacements or play imported skeletal clips**. Dropping files into a folder alone will not change the game. The integrating agent must add a loader/registry, animation wiring and optimized rendering, as described in [INTEGRATION.md](INTEGRATION.md).

## Models

Prefer glTF 2.0 binary `.glb`, with all required textures embedded for a reliable initial import. Supply the editable source (`.blend` or equivalent), source textures and an uncompressed baseline. Avoid mandatory compression extensions on the first delivery; optional compressed versions can follow after decoder support and device checks. No engine-specific shader dependency, missing linked files, external absolute URLs or dependency on a proprietary plugin at runtime.

Project convention: 1 scene unit = 1 meter; +Y up; +Z is asset forward; +X is right. Apply transforms and put the root origin at ground-contact center. Author normal tower footprints within approximately 2.5 m diameter unless a brief explicitly says otherwise. The reactor is larger. Suggested dimensions are visual authoring targets; current simulation uses simplified radius checks, so an integration change is required if the footprint changes significantly.

Use a root node named `root`. Standard aimable tower hierarchy: `root/base` (static), `root/turret` (yaw), `root/turret/weapon_pitch` (pitch where appropriate), `muzzle_01` etc. Muzzles are empty transform nodes facing +Z in weapon-local coordinates. Other sockets: `fx_heat`, `fx_vibration`, `fx_damage`, `audio_origin`, `selection_anchor`. Provide `collision_proxy` and `selection_proxy` as separately named, hidden simple geometry, not baked into visible surfaces. Keep render materials out of proxy geometry.

Full-angle units should preserve design quality across all views. Top-down readability does not excuse an unfinished back. Separate moving mechanical components. Shared tower upgrade parts must maintain pivot locations and socket conventions; upgrades must not shift the gameplay root.

## Materials and textures

Use standard metallic-roughness PBR: base color, normal, roughness/metalness and optional AO/emissive. Base color and emissive are color textures; normal and other numeric maps must remain non-color data. Deliver tangent-space normal maps in glTF's convention. If packing an ORM texture, use R=occlusion, G=roughness, B=metalness and document whether occlusion is actually wired to that image. Do not treat a generated lit beauty image as an albedo, a normal map or a complete PBR set.

Start with 1024² textures for ordinary enemies, 2048² for tower families and bosses, and shared tiling 2048² terrain maps. Provide smaller versions where the art survives. Do not allocate a new 4K map to every tiny component. Texture detail density should match across a family and within an asset. Suggested map sizes are provisional budgets, not quality approval by themselves.

Prefer opaque materials. Use alpha masking for thin structures when justified; document alpha cutoff. Avoid layer stacks of translucent armor and unnecessarily double-sided meshes. Emissive masks should isolate indicators, heated surfaces and active emitters, not flood the entire asset. Distinguish heat, vibration and electric states through motion/form as well as color.

## Animation

Provide named, trimmed clips with root motion removed unless explicitly noted. Loops must close without a visible jump. Expected ground enemy clips: `idle`, `locomotion`, `attack`, `hit`, `death`, `spawn`; additional class clips appear in its brief. Flight uses `flight` instead of locomotion. Structures use `idle`, `construct`, `fire`, `damaged_idle`, `destroy`; some have a continuous operation clip. Base collision must not move during construction or upgrades.

Record clip duration, looping, contact events, firing event timestamps and recommended playback range in `delivery.json`. The simulation remains authoritative about hits and damage. Clips and effects follow simulation events; an animation cannot delay, duplicate or create a hit. Do not bake world position or target coordinates into reusable clips. Separate aim rotations from authored recoil animations.

Suggested initial budgets (verify on iPhone 17, not promises): tower LOD0 8–18k triangles, LOD1 3–7k, LOD2 1–3k; ordinary enemy LOD0 4–8k, LOD1 1.5–3k, LOD2 0.5–1.2k; boss LOD0 20–40k, LOD1 8–16k, LOD2 3–6k; environmental module LOD0 1–8k depending on size. Aim for 1–3 materials per common enemy, 2–4 per tower, and ≤32 joints for common units. Instances, vertices, skinning, texture memory, shadowing and transparency must be measured together with 110 enemies. Never silently lower visible quality to hit a guessed limit; deliver high-quality source plus optimized variants and report tradeoffs.

## Effects, UI and audio

Effects: provide source, atlas/flipbook textures or geometry, timing and blend-mode notes; single-frame concept art is not an animated effect. Use premultiplied-alpha handling only if explicitly recorded; trim borders safely for filtering. Do not assume an imported particle scene runs in Three.js without integration.

UI: vector SVG for small functional icons, with a consistent 24-unit design grid and 2-unit safe border. Supply any raster illustration at 2× display size. No baked labels or currency numbers; text stays accessible HTML. Transparent background where appropriate. Provide disabled/active/hover/cooldown examples without encoding UI state into a single oversized image.

Audio: deliver editable or lossless WAV masters, mono for spatial point effects, stereo for ambiance/music where needed, with start/end silence trimmed and loop points documented. Provide a browser-playable encoded derivative, e.g. MP3, and report exact sample rate/channel count/duration. No clipping, copyrighted samples or mandatory streamed service. Multiple short variants reduce fatigue during continuous waves. Volume and voice limits are integration responsibilities, not hardcoded into asset art.

## File layout and metadata

Stage production deliveries under `public/assets/replacements/<asset-id>/`; do not overwrite the existing procedural export folder. Use `model.glb` (plus `model-lod1.glb` / `model-lod2.glb` when separate), `source/`, `textures/`, `previews/`, and `delivery.json`. For non-model assets use meaningful names such as `icon.svg`, `effect-atlas.png` or `fire-01.mp3`.

`delivery.json` must state `assetId`, `brief`, `version`, `status` (`concept`, `candidate`, or `approved`), `files` by role, bounds in meters, pivot/forward axis, node/socket inventory, clip names/events, LOD triangle counts/material counts, texture dimensions/packing, dependencies, tool/provenance information, limitations and preview paths. This is delivery metadata, not an already-supported runtime registry. A sample appears in [INTEGRATION.md](INTEGRATION.md).

## Reference specifications

Coordinate units, material channel conventions and container structure follow the [Khronos glTF 2.0 specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html). The project's installed loader source is `node_modules/three/examples/jsm/loaders/GLTFLoader.js`; inspect it for exact supported extensions when implementing import.
