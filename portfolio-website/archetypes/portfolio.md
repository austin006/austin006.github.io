+++
title = "{{ replace .Name "-" " " | title }}"
date = "{{ .Date }}"
description = "One-sentence overview of the project and its outcome."
summary = "Two to four sentences that explain what you built, your role, the result, and the skills this project demonstrates."
draft = true

# Optional homepage/archive controls
# featured = true
# weight = 1

# Optional metadata used by the project page layout
# github = "owner/repo-name"
# role = "Mechanical Design Lead"
# team = "4-person student team"
# duration = "September 2024 - April 2025"
# outcome = "Successful launch and recovery at FAR-OUT 2025"
# core_tools = ["Onshape", "OpenRocket", "3D Printing", "Arduino"]
# header_alt = "Short description of the project header image"
# social_image_alt = "Short description used when the page is shared"
#
# Optional hero links shown under the summary
# [[project_links]]
# label = "View Live Demo"
# url = "https://example.com"
# variant = "primary"
# icon = "solid fa-arrow-up-right-from-square"
# new_tab = true
time_spent_hours = 0
+++

<!--
Store all project media in:
static/portfolio/<year>/<project>/

Recommended media naming:
- thumbnail.jpg/png/webp
- header.jpg/png/webp

Reference result media in markdown like:
assets/<project>/filename.ext
-->

## Overview

Summarize the project, your role, the result, and why it mattered.

<!-- Optional external/demo link -->
{{< projectbutton text="View Live Results" url="https://example.com" variant="primary" newtab="true" >}}

## Key Contributions

- Contribution 1
- Contribution 2
- Contribution 3

## Timeline

- **Duration:** Month Year - Month Year
- **Total time:** 00 hours
- **Time commitment:** Example weekly effort or milestone cadence

## Results

### Images

![](assets/example/example-image.png)
{{< caption >}}Short caption explaining what the image shows.{{< /caption >}}

### Videos

{{< youtube VIDEO_ID >}}
{{< caption >}}Short caption describing the video.{{< /caption >}}

### PDFs

{{< pdfembed src="assets/example/example-report.pdf" title="Project report" height="700px" >}}

{{< callout title="Key Result" variant="success" >}}
Summarize the strongest accomplishment, metric, or takeaway.
{{< /callout >}}

## Technical Skills

{{< callout title="Skill Area" variant="tip" >}}
Explain the engineering, software, fabrication, or analysis skill you developed here.
{{< /callout >}}

{{< callout title="Another Skill Area" variant="tip" >}}
Describe another important skill or tool used in the project.
{{< /callout >}}

## Optional Context

{{< callout title="Project Context" variant="info" >}}
Briefly describe the class, research lab, competition, team, or project setting.
{{< /callout >}}
