# 3300-p2

## Canada.csv <br/>
Contains data on average food prices of selected items across Canada from the period January 1996 to February 2018. Prices are adjusted by weight to match US units for ease of comprehension, and converted from CAD to USD using the exchange rates per month from exchange.csv. <br/><br/>
Canadian prices: http://www5.statcan.gc.ca/cansim/a26?lang=eng&retrLang=eng&id=3260012&tabMode=dataTable&p1=-1&p2=9&srchLan=-1#F1 <br/>
Data was filtered to the date range selected, with items filtered based on data availability for US.

## Cpi.csv <br/>
Contains CPI for food in the United States and Canada from the period January 1996 to February 2018. CPI is normalized to start at 100 for January 1996 to make applying calculations to Canada.csv and US.csv simpler. <br/><br/>
US CPI: https://fred.stlouisfed.org/series/CPIUFDNS#0 <br/>
Data selector allowed for normalizing by January 1996 = 100. <br/>
Canadian CPI: http://www5.statcan.gc.ca/cansim/a26?lang=eng&retrLang=eng&id=3260020&tabMode=dataTable&p1=-1&p2=9&srchLan=-1 <br/>
Required conversion from percent change per month to a a classic CPI index normalized for January 1996 = 100. This was done to match the US CPI index, which is also normalized for that range. This calculation was performed in excel by treating the baseline value of January 1996 as 100 and calculating the percent change on top of the previous month’s value with v(t) = v(t-1) + v(t-1)*(percent change)/100

## Exchange.csv <br/>
Contains the exchange rates from CAD to USD and vice versa. This was used for pre-processing the data to transform Canadian dollars into USD so that they could be represented on the same graph. <br/><br/>
https://fred.stlouisfed.org/series/EXCAUS <br/>
The dataset only contained the conversion rate from USD to CAD, so the conversion rate from CAD to USD was calculated as the inverse of that.

## Units.csv <br/>
Contains the units for each food item chosen -- small table for reference purposes. These are taken from the descriptions in the US prices dataset.  <br/><br/>
https://download.bls.gov/pub/time.series/ap/ap.item 

## Us.csv <br/>
Contains data on average food prices in the United States from the period January 1996 to February 2018. <br/><br/>
US prices: https://data.bls.gov/cgi-bin/dsrv?ap <br/>
Multiscreen data selector used to select many food items that were of interest. Area chosen was “U.S. city average” because the data contained was the least sparse out of all the other options and it provided the best coverage of the continental United States. One issue was that many food items Canada covered (butter, pork chops, coffee, tea) were not covered in this data, or had missing values, so we were forced to trim some items that we wanted to look at because of this. 

## US-cpi.csv, canada-cpi.csv <br/>
Divided the average prices by the CPI values/100 in each month to get the real prices. Formula based on http://www.foodsecurityportal.org/adjusting-prices-inflation

## Us-2016-prices.csv, canada-2016-prices.csv <br/>
Small tables containing the 2016 price data for ease of computation in second visualization (best and worst items to purchase in the United States). 

## Us-farms-income.csv <br/>
Heavily pre-processed dataset containing information on the number of farms and cows, total production and profits, and a profit breakdown by gallons/farms/cows annually from 2000 - 2014. Information is gathered from many different sources, and unit conversions / assumptions about data accuracy were made to reach the numbers presented. Subsidies is equal to the amount of money the U.S. government subsidizes the dairy industry by yearly, earned profits are the profits that are earned from market sales, and total profits are equal to the sum of subsidies + earned profits. <br/>
Amount of production (pounds, required conversion to gallons): http://future.aae.wisc.edu/data/annual_values/by_area/99?period=complete&tab=production <br/>
Farm income data (earned profits = value of production - operating costs - wages - farm overhead - rent (based on canadian data collection method)): https://www.ers.usda.gov/data-products/commodity-costs-and-returns/commodity-costs-and-returns/#Recent%20Costs%20and%20Returns:%20Milk <br/>
Farm subsidies: https://farm.ewg.org/progdetail.php?fips=00000&progcode=dairy <br/>
Number of dairy cows: https://www.statista.com/statistics/194934/number-of-milk-cows-in-the-us-since-1999/ <br/>
Number of dairy farms: https://www.hoards.com/sites/default/files/Fewer%20dairy%20farms%20left%20the%20business.pdf <br/>
https://www.progressivepublish.com/downloads/2017/general/2016-pd-stats-lowres.pdf 

## Canada-farms-income.csv <br/>
Heavily pre-processed dataset also containing information on the number of farms and milk cows across canada, total production and profits, and profit breakdowns from 2000 - 2014. In Canada, a “Supply Management” system is in use, which means that there are no government subsidies -- as a result, earned profits are equal to total profits. <br/>
Amount of production (HL, required conversion to gallons): http://dairyinfo.gc.ca/index_e.php?s1=dff-fcil&s2=msp-lpl&s3=hmp-phl&page=histprod <br/>
Number of cows: http://aimis-simia-cdic-ccil.agr.gc.ca/rp/index-eng.cfm?action=pR&r=219&pdctc= <br/>
Farm income data (profits = net operating income): http://www5.statcan.gc.ca/cansim/a26?lang=eng&retrLang=eng&id=0020035&tabMode=dataTable&p1=1&p2=-1&srchLan=-1&pattern=milk <br/>
Number of farms: http://aimis-simia-cdic-ccil.agr.gc.ca/rp/index-eng.cfm?action=pR&r=220&pdctc= 
