---
layout: post
title:  "Living Wage in Java Island"
date:   2020-02-23 14:37:39 +0700
categories: experiment d3js
permalink: /:categories/:title
link: /java-living-wage/
workfolder: /projects/umkjawa
image: header-umkjawa-03.jpg
---

Sometimes in the past, if my memories are right, I once looked at one map that shows the most cheap living cities in Indonesia, based on the minimum wage and the living cost in that city. Years after, I search again the map, and I found nothing. But then I found the similar map about living-wage in United States, written in this [article][article]. The article shows a lot of map, but the interactive map itself is not available anymore. But the tool, called the [Living Wage Calculator][calculator] made by MIT are still available online. So I go checked how the calculator worked, and happily they also published the technical documentation and research method, complete with any assumption needed.

Inspired by the calculator, and the "missing" interactive map, I tried to make it by myself. After collecting some dataset from the government officials, [the Central Bureau of Statistics][bps], I found a lot of missing data. The city/regency levels minimum wage didn't cover all of Indonesia, and for the living cost data provided by the Central Bureau of Statistics only cover 84 cities/regencies all over Indonesia, yet 26 (almost quarter of the cities covered) are located in Java Island. Then I decided to make the interactive map only on Java Island. The method itself almost similar from what the MIT did, but I simplified it because of lack of data.

After learning to made the bar chart with [d3.js][d3], this time I level up my game for making map with the same tool. I did the map analysis with [QGIS][qgis], an open source geographic information system. It has a bunch of tools to analyze spatial (or not) data, and because I only have 26 cities/regencies living cost dataset, I have to interpolate it to all 119 cities/regencies all over Java Island with it.

Because my lack of experience and knowledge in JavaScript and JQuery, I made the code quite messy and inefficient. As a result, the interactive map are really heavy to load. It need almost a minute just to load the first page, depends on the browser, computer, and internet connection. The worst thing, it's not mobile friendly, my mobile browser always crash trying to load the page. So if you want to visit the [project][project], make sure you use your computer.

As a compensation for the bad mobile performance, I write the summary of this little research on this [article][medium]. Enjoy!


[article]: https://www.citylab.com/life/2015/09/mapping-the-difference-between-minimum-wage-and-cost-of-living/404644/
[calculator]: https://livingwage.mit.edu/
[bps]: https://bps.go.id/
[d3]: https://d3js.org/
[qgis]: https://www.qgis.org/en/site/
[project]: http://louislugas.com/java-living-wage/
[medium]: https://medium.com/@louislugas/hidup-layak-di-pulau-jawa-4f015c99f63b
