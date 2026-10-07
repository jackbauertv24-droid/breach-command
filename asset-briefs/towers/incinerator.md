# Incinerator — base configuration

Asset ID: `incinerator`

Current export: `public/assets/models/incinerator.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A brutal short-range industrial thermal projector adapted for defense. Pressure vessels, insulated hoses and a heat-resistant nozzle explain the weapon; it is neither a magical fire wand nor a cheerful flamethrower toy. This asset is the base configuration, not an interchangeable skin.

## Gameplay identity

Runtime type: `incinerator`; tier: 0; branch: null. Role: Short range · heat & area damage. Current baseline firing interval: 0.2 seconds; range: 6 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

A squat heavy pressure manifold, one broad forward nozzle, flanking protected fuel/propellant vessels and a shielded operator/service zone at the rear. The hot front and contained rear have visibly different material treatment.

Base single nozzle with protected pressure vessels.

Establish the family silhouette and pivot layout here before producing its upgrades. The four later variants must clearly belong to this machine.

## Materials and close-up requirements

Ceramic nozzle liner, braided protected hoses, pressure fittings, purge valves, heat shields, expansion joints and soot where flames actually pass. Keep fuel plumbing logical rather than ornamental. Use painted steel, exposed metal only where appropriate, heat-resistant ceramics or insulation where the function requires them, and restrained status lighting. Major edges require believable chamfers. Detail must survive neutral light and maximum allowed zoom; baking a lit image on a box is unacceptable.

## Motion and sockets

Valve actuation precedes a controlled flame envelope; nozzle tremor and brief purge follow firing. Continuous firing must blend cleanly. Show significant heat through surfaces and distortion, not full-body orange glow. Required nodes: `root`, `base`, `turret`, and `weapon_pitch` where the mechanism elevates. Required effect anchors: numbered muzzles/electrodes, `fx_heat`, `fx_damage`, `selection_anchor`; Seismic also needs `fx_vibration`. Clips: `idle`, `construct`, `fire`, `damaged_idle`, `destroy`. Aim yaw and recoil must remain independently controllable.

## Size and deliverables

Proposed size: 2.5 m footprint, 2.5 m depth, 1.9 m height; low heavy silhouette. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/incinerator/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi incinerator for Breach Command, specifically base configuration. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
