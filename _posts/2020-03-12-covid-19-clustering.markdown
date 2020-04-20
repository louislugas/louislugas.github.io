---
layout: post
title:  "Covid-19 Victim Clustering"
date:   2020-03-12 17:37:39 +0700
categories: experiment d3js covid19
permalink: /:categories/:title
link: /covid19-cluster/
workfolder: /projects/covid19cluster
image: header-c19cluster-03.jpg
---

The official 1st and 2nd case of COvid-19 victim in Indonesia were announced in 2 March 2020. These first 2 cases data were published with details of how she got the virus, and how she could infected others by the places she had been. This kind of data was really helpful for the citizen to take precaution.

This project are inspired by a Singaporean, a computer teacher, who made [this][web] by himself, just for the sake of helping others with giving information with more clarity. The network graph are the perfect solution to depict how victims are connected with other victims, and the more details the data are, the more citizen will be aware of their neighborhood.

But the government stopped for being transparent about these data. Since 15 March 2020, the data details were gradually eliminated. Until now, the government only provide the total numbers of the case. They're even not giving any data about age, sex, and where they could've been before the infection. And the key for a good network graph are a detailed dataset. Since then, my network graph was not relevant anymore.

At 21 March 2020, the National Health Ministry made a same network graph, using my code without permission. Surprisingly they had more detailed data than mine, since I got the official data only from the Health Ministry. But when I checked their data, there were so much missing or data error, double input, and different case number. The funny part, I realized my code was inefficient for handling live large dataset because I use native JSON, so I had to type it all the data, no matter how much is it. And they (Health Ministry) still used my code.

Unfortunately, at 23 March 2020, the web made by Health Ministry was taken down, and because of lack of data source, I also stopped my update in 24 March 2020.

[web]: https://co.vid19.sg/singapore/cases
