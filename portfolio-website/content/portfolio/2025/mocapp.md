+++
title = "Autonomous Quadrotor Flight"
date = "2025-12-30"
description = "Built and flew an X650 quadrotor indoors with motion-capture feedback, then validated autonomous trajectories through a ROS 2 / PX4 / Gazebo simulation workflow."
summary = "Built an X650 quadrotor from a Holybro kit, integrated a Jetson Nano, and flew the vehicle indoors in BYU's MAGICC Lab without GPS by connecting it to the motion-capture system. I also set up an Apptainer-based ROS 2 / PX4 / Gazebo environment on BYU's ORC Red Hat Linux infrastructure and used it to develop and validate trajectories before physical flight. The project highlights robotics infrastructure, flight testing, and simulation-to-hardware iteration."
github = "austin006/3d_printed_quad"
time_spent_hours = 250
role = "Research Assistant"
team = "BYU MAGICC Lab"
outcome = "Established a full simulation-to-flight workflow for indoor GPS-denied quadrotor testing, including figure-eight, waypoint, and orbital trajectories."
core_tools = ["Jetson Nano", "ROS 2", "PX4", "Gazebo", "Apptainer", "Motion Capture", "Python", "Matplotlib"]
header_alt = "X650 quadrotor flying indoors in the motion-capture room during autonomous flight testing."
social_image_alt = "Autonomous X650 quadrotor project showing indoor mocap flight and ROS 2 / PX4 / Gazebo trajectory development."
duration = "August 2025 - December 2025"

featured = true
weight = 3
+++

## Overview

This project focused on extending quadrotor development beyond hardware into **indoor autonomous flight** and **simulation-driven testing**. I built an **X650 quadrotor** from a Holybro kit, integrated a **Jetson Nano**, and flew the vehicle manually before connecting it to the **BYU MAGICC Lab motion-capture system** for indoor GPS-denied flight.

In parallel, I set up an **Apptainer-based simulation environment** on BYU's **ORC Red Hat Linux** infrastructure so that **ROS 2**, **PX4**, and **Gazebo** could be used together in a reproducible workflow for trajectory development and validation.

## Development Workflow

I used an iterative simulation-to-hardware process for each trajectory:

1. **Generate and visualize the path** in Python using Matplotlib
2. **Simulate the trajectory** in the ROS 2 / PX4 / Gazebo environment
3. **Fly the same trajectory physically** on the X650 quadrotor in the motion-capture room

This workflow made it possible to test and refine trajectories before committing to physical flight.

## Results

![](assets/mocapp/Picture1.png)
{{< caption >}}X650 quadrotor platform used for indoor motion-capture flight testing{{< /caption >}}

The flight-testing workflow supported multiple trajectory types, including:

- **keyboard velocity commands**
- **waypoint following**
- **figure-eight flight**
- **complex rotating orbital patterns**

### Figure-Eight Flight

{{< youtube YurecbPknG0 >}}
{{< caption >}}Figure-eight trajectory generated and visualized in Python before simulation{{< /caption >}}

{{< youtube _xPo_lsCf04 >}}
{{< caption >}}Figure-eight trajectory in the ROS 2 / PX4 / Gazebo simulation environment{{< /caption >}}

{{< youtube Gr0EDIGwJrA >}}
{{< caption >}}Figure-eight trajectory flown on the physical X650 quadrotor in the mocap room{{< /caption >}}

### Rotating Orbital Trajectory

{{< youtube blZAOD6I9xI >}}
{{< caption >}}Rotating orbital trajectory generated and visualized in Python before simulation{{< /caption >}}

{{< youtube LEElBaF_Y80 >}}
{{< caption >}}Rotating orbital trajectory validated in simulation before flight testing{{< /caption >}}

{{< youtube hQ9VK_JHe44 >}}
{{< caption >}}Rotating orbital trajectory executed on the physical X650 quadrotor{{< /caption >}}

## Technical Skills

{{< callout title="Simulation Infrastructure" variant="tip" >}}
Set up a reproducible robotics workflow using **Apptainer**, **ROS 2**, **PX4**, and **Gazebo** inside a shared Linux compute environment.
{{< /callout >}}

{{< callout title="Indoor GPS-Denied Flight" variant="tip" >}}
Learned how to use a **motion-capture system** to enable stable indoor quadrotor testing when GPS data is unavailable.
{{< /callout >}}

{{< callout title="Simulation-to-Hardware Iteration" variant="tip" >}}
Built a disciplined workflow in which trajectories were generated, visualized, simulated, and only then flown on the physical platform.
{{< /callout >}}
