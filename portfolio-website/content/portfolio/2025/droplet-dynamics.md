+++
title = "Water Balloon and Droplet Dynamics"
date = "2025-12-30"
description = "Modeled the impact and rebound of a water balloon and a water droplet using high-speed video data and a two-state dynamic system."
summary = "Investigated soft-body impact behavior by tracking the motion of a bouncing water balloon and comparing it to a water droplet example. I used high-speed video, frame-by-frame tracking, and a two-state Python model to estimate spring and damping behavior during impact. The project highlights dynamic modeling, experimental data fitting, and interpreting where an idealized model succeeds or breaks down."
time_spent_hours = 15
role = "Modeling and Analysis Team Member"
outcome = "Built a two-state Python model that matched bounce height and impact duration for both a water balloon and a water droplet."
core_tools = ["Python", "High-Speed Video", "Video Tracking", "Dynamic System Modeling"]
header_alt = "Experimental and modeled bounce plots for a water balloon and a water droplet."
social_image_alt = "Dynamics project comparing experimental and simulated bounce behavior for a water balloon and a water droplet."
# team = "Add project team or course context here"
# duration = "Add project duration here"
+++

## Overview

This project began as an attempt to study the **impact physics of a bouncing water droplet**. After repeated attempts to create a repeatable droplet bounce with the available equipment, the scope shifted to a **small water balloon bouncing vertically**, which still provided a useful soft-body impact system for modeling.

Although the spring and damping behavior of a water balloon does not perfectly map to a true droplet, the system still provided insight into **impact compression**, **energy loss**, and how fluid-filled bodies respond when they strike the ground.

## Methods

I used a **high-speed camera** to record the water balloon bouncing after being released from a height of **six inches** with **zero initial velocity**. The balloon position was then logged frame by frame with video-tracking software to build the experimental position history.

To model the system, I created a **two-state dynamic model** in Python:

- **State 1:** while the balloon was in free fall, the model included gravity and aerodynamic drag
- **State 2:** once the balloon contacted the ground, it was modeled as a **mass-spring-damper** system

I solved the combined system numerically and used **trial-and-error fitting** on the drag, spring, and damping coefficients until the modeled response aligned as closely as possible with the experimental data.

Each coefficient influenced the motion in a different way:

- Increasing the **drag coefficient** slowed the balloon during free fall
- Increasing the **spring coefficient** shortened the impact duration and caused the balloon to rebound faster
- Increasing the **damping coefficient** reduced the height of each subsequent bounce by dissipating more energy during impact

## Results

{{< imagepair
src1="assets/droplet-dynamics/balloon.png"
src2="assets/droplet-dynamics/droplet.png"
caption="Experimental and modeled bounce histories for the water balloon (left) and water droplet (right)"
>}}

For the **water balloon**, the best-fit coefficients were:

- **Spring coefficient:** `k = 250 N/m`
- **Damping coefficient:** `c = 0.9 N*s/m`

For the **water droplet** comparison case, the fitted values were:

- **Spring coefficient:** `k = 2 N/m`
- **Damping coefficient:** `c = 0.0009 N*s/m`

The model captured the **bounce height** and **time under compression** reasonably well, especially for the first few bounces. However, the free-fall timing did not align perfectly with the recorded data, causing the simulation and experiment to drift apart over time.

### Reference Videos

{{< youtube E0xp-bi2sCw >}}
{{< caption >}}Slow Motion Balloon Drop{{< /caption >}}

{{< youtube riXp_Q-fDv8 >}}
{{< caption >}}Slow Motion Bouncing Water Droplet Falling onto Super-Hydrophobic Surface{{< /caption >}}

## Discussion

The most important conclusion was that the **ground-impact phase** could be modeled more successfully than the **in-air motion**. Adjusting the spring and damping coefficients made it possible to match rebound height and contact duration fairly well. Adjusting the drag coefficient, however, did not produce realistic values while also fixing the free-fall timing.

There are a few likely reasons for the mismatch:

- **Time-sampling error:** the camera or tracking software may not have captured time intervals exactly as assumed
- **Perspective drift:** the water balloon moved slightly toward the camera, which made the apparent ground reference shift
- **Changing fluid shape:** the drag model assumed a constant area, but a balloon or droplet continuously changes shape in flight

This suggests that the **mass-spring-damper contact model** was a useful approximation, while the free-fall drag model was too simple for a deformable fluid body.

{{< callout title="Practical Relevance" variant="success" >}}
This kind of modeling is useful for understanding **soft-body impacts**, **energy absorption**, and **fluid-based damping systems**, with practical parallels in protective packaging and impact-mitigation design.
{{< /callout >}}

## Technical Skills

{{< callout title="Dynamic Modeling" variant="tip" >}}
Built and tuned a **hybrid two-state dynamic model** that switched between free-fall motion and mass-spring-damper contact behavior.
{{< /callout >}}

{{< callout title="Experimental Analysis" variant="tip" >}}
Used **high-speed video** and **frame-by-frame tracking** to extract real motion data for comparison against a simulated model.
{{< /callout >}}

{{< callout title="Engineering Judgment" variant="tip" >}}
Interpreted where the model matched reality well and where simplifying assumptions, especially around drag, broke down.
{{< /callout >}}
