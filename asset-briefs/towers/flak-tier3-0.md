# Flak battery — upgrade 3 / Shrapnel

Asset ID: `flak-tier3-0`

Current export: `public/assets/models/flak-tier3-0.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A fast-tracking anti-air battery built for fragmentation bursts. It is compact, agile in its aiming mechanism and visually distinct from the slower missile platform. This asset is the upgrade 3 / Shrapnel, not an interchangeable skin.

## Gameplay identity

Runtime type: `flak`; tier: 3; branch: 0. Role: Air priority · fragmentation. Current baseline firing interval: 0.55 seconds; range: 12 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

Four short substantial barrels in a compact elevated cradle, a recognizable tracking dish or enclosed radar head and a broad stable mounting ring. Elevation is more pronounced than Autocannon.

Shrapnel: heavy shell breeches and fragmentation-ammunition modules; pair with wider burst effects.

Maintain the root, footprint and aiming socket positions from [the previous configuration](flak-tier2.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Barrel breeches, short recoil channels, rugged tracking optics, shell feeds, split armor around elevation joints, cable strain relief and service markings. Radar should not look like a household satellite dish. Use painted steel, exposed metal only where appropriate, heat-resistant ceramics or insulation where the function requires them, and restrained status lighting. Major edges require believable chamfers. Detail must survive neutral light and maximum allowed zoom; baking a lit image on a box is unacceptable.

## Motion and sockets

Quick turret tracking, independently blended elevation and tight barrel recoil, with restrained airburst flashes. Do not make the entire base turn. Required nodes: `root`, `base`, `turret`, and `weapon_pitch` where the mechanism elevates. Required effect anchors: numbered muzzles/electrodes, `fx_heat`, `fx_damage`, `selection_anchor`; Seismic also needs `fx_vibration`. Clips: `idle`, `construct`, `fire`, `damaged_idle`, `destroy`. Aim yaw and recoil must remain independently controllable.

## Size and deliverables

Proposed size: 2.4 m base diameter, 2.1 m width across guns, 2.5 m height. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/flak-tier3-0/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi flak battery for Breach Command, specifically upgrade 3 / Shrapnel. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
