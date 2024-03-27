# 👋 hi

The purpose of this app is to help introduce candidates to companies and hiring managers by providing a cover letter style template (introduction) that can be edited.

An example intro [https://bsawyer.github.io/hi/sentry](https://bsawyer.github.io/hi/sentry)

## Writing an introduction

1. git clone this repository `~ git clone git@github.com:bsawyer/hi.git`

2. install next and other dependencies `~ npm i`

3. run the dev server `~ npm run dev`

4. open `http://localhost:3000/hi` and create a new introduction

## Publishing

There are two options when publishing:

- This repo is configured to deploy a Next.js static application on github, links can be found at `https://<username>.github.io/hi/<slug>`
- Running the app locally, visiting `http://localhost:3000/hi/<slug>`, and printing the page with destination "Save As PDF"

> ⚠️ Warning - If you plan on sharing your intro as a link, check you are not including any information you wouldn't want publicly available i.e. if hosted on github or a similar site it would be possible to find your intro, resume or LinkedIn profile. Alternatively saving the page as a pdf locally and uploading as a file will ensure only your recipient has access.
