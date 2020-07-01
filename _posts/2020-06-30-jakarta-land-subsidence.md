---
layout: post
title:  "Jakarta Land Subsidence"
date:   2020-06-30 17:37:39 +0700
categories: indepth tirto experiment d3js
permalink: /:categories/:title
link: /jakarta-land-subsidence/
workfolder: /projects/peta-penurunan-tanah
image: header-subsiden.jpg
---

[Heri Andreas][heri-andreas], a geodetic and geomatic researcher and lecturer at Bandung Institute of Technology, made a forecast of Jakarta land subsidence. Due to the rapid and unregulated development in Jakarta, their land are sinking deeper and faster than ever. Based by the information from 10 years period measurement, 1997, 2007, and 2017, he made a forecast how large the land of Jakarta will be affected by the subsidence in 2025 and 2050.

I decided to make the map with slider, to show the change of the land subsidence, and I add some pace control with `play`, `next`, and `previous` buttons.

The data were only on those specific years, without any interpolation. So I made the interpolation manually with Adobe After Effect, and render it as a sequence, one year a frame. Since the interpolation are not research based, just my personal interpretation to make the animation smooth, I also made the slider thumb snapping only on the designated years.

This article are initiated by [Wan Ulfa][ulfa], founder of [Indonesian Data Journalism Network][idjn], to celebrate the 493rd Jakarta birthdaay at June 22nd. The full article can be read in Indonesian [here][article]

[heri-andreas]: https://www.linkedin.com/in/heri-andreas-61a02036/?originalSubdomain=id  
[ulfa]: https://twitter.com/tabularasafa
[idjn]: https://idjnetwork.org/
[article]: https://tirto.id/masalah-usang-dan-runyam-penurunan-muka-tanah-jakarta-fKwS
