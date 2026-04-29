+++
title = "Name of Your Project"
date = "20XX-XX-XX"
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

[_build]
render = "never"
list = "never"
+++

This file reflects the current recommended structure for a new portfolio project page.

If you create new pages with `hugo new portfolio/<year>/<project>.md`, the same structure is also available through [portfolio.md](portfolio-website/archetypes/portfolio.md).

## Before You Write

- Store all project media in `static/portfolio/<year>/<project>/`
- Add a `thumbnail.*` image for the project tile
- Add a `header.*` image for the top of the project page if you want a different hero image
- If `header.*` is missing, the site will use `thumbnail.*`
- If `thumbnail.*` is also missing, the first image in the project folder will be used
- Reference project media in markdown with `assets/<project>/filename.ext`

## Overview

Write 1-3 short paragraphs that explain:

- what the project was
- why it mattered
- what your role was
- what technical areas it demonstrates

If the project has a GitHub repository, add `github = "owner/repo-name"` in front matter.
The project page will automatically show a GitHub button under the title and summary.

If you want a scannable project highlight row under the summary, add any of these optional fields:

- `role`
- `team`
- `duration`
- `outcome`
- `core_tools`

If you want additional hero buttons under the summary, add one or more `[[project_links]]` entries in front matter.

If the project has an external demo, report, or results page, add a button near the top:

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

Use the Results section to show the strongest proof of the work. Good patterns include images, videos, PDFs, and short accomplishment callouts.

### Images

![](assets/example/example-image.png)
{{< caption >}}Short caption explaining what the image shows.{{< /caption >}}

### Videos

{{< youtube VIDEO_ID >}}
{{< caption >}}Short caption describing the video.{{< /caption >}}

### PDFs

{{< pdfembed src="assets/example/example-report.pdf" title="Project report" height="700px" >}}

### Outcome Callout

{{< callout title="Key Result" variant="success" >}}
Summarize the strongest accomplishment, metric, technical result, or project takeaway.
{{< /callout >}}

## Technical Skills

Use 2-4 callouts to explain what you learned or demonstrated.

{{< callout title="Skill Area" variant="tip" >}}
Explain the engineering, software, fabrication, or analysis skill you developed here.
{{< /callout >}}

{{< callout title="Another Skill Area" variant="tip" >}}
Describe another important skill, tool, or workflow used in the project.
{{< /callout >}}

## Optional Context

If helpful, add a short context block for the class, lab, research group, competition, or team setting:

{{< callout title="Project Context" variant="info" >}}
Briefly explain the course, team, lab, mentor, or competition context.
{{< /callout >}}

## Navigation

End each project page with the standard back-navigation buttons:
