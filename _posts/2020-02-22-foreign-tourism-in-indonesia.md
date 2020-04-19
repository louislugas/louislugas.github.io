---
layout: post
title:  "Foreign Tourism in Indonesia"
date:   2020-02-22 17:37:39 +0700
categories: experiment d3js
permalink: /:categories/:title
link: /foreign-tourism/
workfolder: /projects/wisata
image: header-wisman-03.jpg
---

In the late 2019, I found and watched an amusing infographic [video][video-fallen] about the victim of World War II created by [Neil Halloran][neil-halloran]. I tried to find how he achieve such an extraordinary visualization, an interactive video. Then I found about [d3.js][d3], a sophisticated JavaScript to create an interactive data visualization, close to what I thought Neil Halloran did (later I found he used [three.js][three].

At the same time, simple animated data-viz was popular on the social media. It was the bar race chart. Many people were obsessed with these, and surprisingly is easy to make. One of the popular tools on the internet is [flourish][flourish]. It's free, has a lot of chart option, interactive, and has a easy learning curve, anybody can make an interesting interactive chart by their own.

But personally, flourish still have a limited option. They offered more option to explore, but it's come with a price, an expensive one. So, I decided to take the hard way: learn d3.js and try to make any kind data visualization I want from scratch. Yet, I didn't have much JavaScript basic, so it's quite hard to follow any tutorial on the internet. But that's the art of studying, right?

The first data-viz I try to make is the one and only: "Bar Race Chart". Bar chart (and line chart) is the simplest chart using d3.js, even any d3.js tutorial start with making a bar chart. The "race" animation itself was another challenge. Since I work in a news company, I ask one of my researcher friend for a simple dataset from a published article that contained an annual data series to it, so I can animated. So she gave me the dataset about annual foreign tourism trend in Indonesia. The article can be read [here][article]. The article itself already have a bar race chart from the same dataset, made by the researcher team with flourish.

The original chart was plain and simple, and the most care about was the design standard. I usually made a static infographic following some design standard such as standard font, aspect ratio, and company logo. It was all determined by the art director. the flourish chart can't fit the given standard. Another thing I want to improve from the original chart was the animation interactivity. Original flourish bar chart are automatically played and looped, and I want to give more control for it such as pause, play, next, and previous button. Later I realized it was a hell of code.

After days of coding back and forth, many errors I don't even know why, reading and asking multiple tutorials and documentation, I finished my first d3.js bar race chart. It still have many flaws here and there, yet I done the most of the features I planned to make, and I'm proud of myself to finish it

[video-fallen]: https://www.youtube.com/watch?v=DwKPFT-RioU&t=55s  
[neil-halloran]: https://twitter.com/neilhalloran?lang=en
[d3]: https://d3js.org/
[three]: https://threejs.org/
[flourish]: https://flourish.studio/
[article]: https://tirto.id/kunjungan-wisman-malaysia-paling-banyak-inggris-paling-royal-ehKV
