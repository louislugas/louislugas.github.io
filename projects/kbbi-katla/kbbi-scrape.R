library(rvest)
library(tidyverse)
library(stringr)

# url KBBI
url <- "https://www.kbbi.co.id/daftar-kata?page="

# initial value untuk for loop
x <- 1

# for loop dari halaman 1 - 106 di web kbbi
for (x in 1:106) {
  xchar <- as.character(x)
  completeurl <- paste(url,xchar,sep ='', collapse ='')

  daftarkata <- read_html(completeurl) %>%
    html_nodes(".row") %>%
    html_nodes("a") %>%
    html_text()
  
  tempkata <- data.frame(daftarkata)
  kata <- rbind(kata,tempkata)
  
  x = x + 1
}

# tambah kolom untuk menghitung jumlah huruf
kata$panjang = str_length(kata$daftarkata)

# filter berdasarkan jumlah huruf (5)
limakata <- dplyr::filter(kata, panjang == 5)

# hapus kolom penghitung huruf
limakata <- subset(limakata, select = -c(panjang))

# hapus imbuhan (dengan tanda - )
limakata <- as.data.frame(limakata[!grepl("-", limakata$daftarkata),])

# benerin nama kolom
names(limakata) <- c('daftarkata')

# save dataframe "limakata" ke dalam file csv
write.csv(limakata,"A:\\Work\\kbbi-katla\\limakata.csv", row.names = FALSE)
