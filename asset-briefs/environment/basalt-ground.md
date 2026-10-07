# Basalt battlefield surface

Asset ID: `basalt-ground`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

A tileable compacted volcanic regolith surface with basalt chips, subtle extraction disturbance and sparse mineral flecks. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Moderate value contrast and restrained charcoal/warm gray. Fine cracks must not form roads, arrows or repeated large landmarks. Supply albedo, normal, roughness and optional height; no sun or shadow baked into color. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

2048² tile, proposed 8–12 m world repeat; include seam tests over a 5×5 repeated plane. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/basalt-ground/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

The current ground uses one repeated generated image; replacement PBR channels require material wiring. Preserve arbitrary movement and placement on the map. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony basalt battlefield surface using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
