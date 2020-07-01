---
layout: post
title:  "North Jakarta Flood"
date:   2020-06-25 17:37:39 +0700
categories: indepth tirto experiment d3js
permalink: /:categories/:title
link: /north-jakarta-flood/
workfolder: /projects/banjir-pluit
image: header-banjir-pluit.jpg
---

Historically, Jakarta was a alluvial swampy plain. At the beginning of the colonial era, the Dutch built a city of Batavia with their dutch canal technology at the coast. Batavia then, experienced some great flood because of it, primarily by the high rainfall. After the Indonesian independence, Jakarta become the capital city, and grew fast, both population and infrastructures.

Driven by many aspects, the development of Jakarta were, and still not considering its environmental impact. Since then, flood is a common thing in Jakarta. Less than decade ago, it is known as a 5 year period flood. But the last 5 year, flood become annually.

Celebrating the 493rd Jakarta birthday at June 22nd, [Wan Ulfa][ulfa], founder of [Indonesian Data Journalism Network][idjn], ask me to make some interactive infographic to complement her article about these never finished problems in Jakarta.

One of them are survey by Hiroshi Takagi, researcher from Tokyo Institute of Technology. At first it just shows 3 chart that shows percentage. When I thought there are no urgency to make these chart interactive, she showed me the chart made by [New York Times][nyt], where the audience can guess the value of the chart, in my case are the percentage. While New York Times uses line chart to shows progress, I use bar chart to show the percentages.

Tirto.id article page are not supporting a scroll-based interactivity because I use `<iframe>` for the embedded infographic. So I have to finished in one multiple page infographic. Before the "bar guessing", I made a bit of intro animation with CSS and D3.js. I felt a bit frustrated because some of the code didn't work well with safari browser, the CSS `stroke-dashoffset` are laggy, and it crashed multiple times because I use the wrong loop of D3.

But fortunately I finished it all, not working so good at first, because the responsiveness of tirto.id itself, so I had to make some adjustment. It is not perfect now, but it works. You can read the full article in Indonesian [here][article]

[ulfa]: https://twitter.com/tabularasafa
[idjn]: https://idjnetwork.org/
[nyt]: https://www.nytimes.com/interactive/2017/01/15/us/politics/you-draw-obama-legacy.html?mtrref=undefined&assetType=REGIWALL
[article]: https://tirto.id/masalah-usang-dan-runyam-penurunan-muka-tanah-jakarta-fKwS
