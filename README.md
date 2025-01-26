# TaterTotTracker

An app to describe growing baby size, exclusively in units of Potato.

## Visit it on the Web

[www.tater-tot-baby-tracker.link](https://www.tater-tot-baby-tracker.link)

## How to Run Locally

1. Clone the Repo
2. Run `npm start` from the tater-tot-tracker directory

### Run the Linter and Formatter

`npm run lint:fix`

`npm run format`

## References

* ChatGPT and VSCode/Github Copilot were both used for drafting, brainstorming, and troubleshooting
* [Potato Color Palette](https://www.color-hex.com/color-palette/27154)
* [Baby Weight Reference](https://www.mdrcindia.com/blog/detail/fetal-growth-chart-week-by-week-size-and-weight-of-the-fetus)
* Images Created with Bing AI Image Generator
  * Prompt: simple cartoon [POTATO TYPE] that has two eyes and a diaper, looks cute and like a baby
* Extensions: ESLint and Prettier
* Guide for Hooking up [S3, Cloudfront, and ACM](https://dev.to/oayanda/static-website-setup-on-amazon-cloud-using-cloudfront-s3-route53-acm-for-ssl-44ij)
* Using CloudFront, S3, and ACM for [Hosting the Site on AWS](https://www.youtube.com/watch?v=YEIuuVKIy8U)

## Lessons Learned During the Project

* CSS is still very fiddly, and I have a LOT to learn about front end development
* There's definitely still a need to verify data coming out of GenAI: ChatGPT told me that a 40 week baby should be around 700g, when other sources say closer to 3500grams. Thats significantly off
* BingAI Image Generator continues to impress, and you can get some solid consistent images of a similar style with similar prompts
* Scaling through json files is the way to go
* Github Kanban Project Planning tool is great. Here is a link to the [Kanban Board from development](https://github.com/users/edjineer/projects/1/views/1).
* AWS Bucket Policies matter, and it matters to update it after hooking it up to cloudfront
* Registering a DNS costs money, and different top-level-domains have different hosting rates
