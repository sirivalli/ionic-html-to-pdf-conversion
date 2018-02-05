`<!DOCTYPE html>
<html>
   <head>
      <title>Page Title</title>
   </head>
   <style> * { font-size: 14px; } .bg-img { background-repeat: no-repeat; background-size: cover; background-image: url(https://image.freepik.com/free-psd/abstract-background-design_1297-87.jpg); background-color: #ccc; height: 940px; } .logo { padding-top: 60%; text-align: center } .logo img { width: 70% } .content { text-align: center; padding: 20px 0 0 0; max-width: 1010px; margin: 0 auto; } .heading { color: white; font-family: Calibri, sans-serif; font-size: 22px; } .footer { background-color: #ffaf00; font-size: 10px; } .bg-div { height: 870px; } .bg-div3 { height: 870px; } .bg-div4 { height: 860px; } .div-rotate { /* Rotate div */ -ms-transform: rotate(270deg); /* IE 9 */ -webkit-transform: rotate(270deg); /* Safari 3-8 */ transform: rotate(270deg); padding-top: 45px; padding-right: 0px; height: 90%; }</style>
   <body>
      <!-- First page --> 
      <div>
         <div class="bg-img">
            <div class="logo"> <img src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png"> </div>
            <div class="content">
               <h1 class="heading">Delivering Energy Independence, one roof at a time </h1>
               <div style="padding-top:10px;"></div>
               <div style="width: 100%;color: #fff;">
                  <div style="width:30%;float: left;font-family: Calibri, sans-serif;">
                     <div>
                        <div style="">Proposal Details</div>
                        <div style="font-size: 11px;">
                           <div style="padding-top: 9px; padding-bottom: 9px;">Prepared on:${details.preparedOn}</div>
                           <div style="padding-top: 9px; padding-bottom: 9px;">System Size: kWp ${details.systemsize}</div>
                        </div>
                     </div>
                  </div>
                  <div style="width:30%;float: left;font-family: Calibri, sans-serif;">
                     <div>
                        <div>Customer Details</div>
                        <div style="font-size: 11px;">
                           <div style="padding-top: 9px; padding-bottom: 9px;"> Name: ${details.name} </div>
                           <div style="padding-top: 9px; padding-bottom: 9px;">Address:${details.address}</div>
                           <div style="padding-top: 9px; padding-bottom: 9px;">City/State:${details.city}</div>
                        </div>
                     </div>
                  </div>
                  <div style="width:30%;float: left;font-family: Calibri, sans-serif;">
                     <div>
                        <div>Proposed by</div>
                        <div style="font-size: 11px;">
                           <div style="padding-top: 9px; padding-bottom: 9px;">Sales Consultant: ${details.salesConsultant}</div>
                           <div style="padding-top: 9px; padding-bottom: 9px;">Contact:${details.contact} </div>
                           <div style="padding-top: 9px; padding-bottom: 9px;">Email: ${details.email}</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style="clear:both;"></div>
            </div>
         </div>
         <div class="footer">
            <table>
               <tr>
                  <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td>
               </tr>
               <tr>
                  <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td>
               </tr>
            </table>
         </div>
      </div>
      <!-- End First page --> 
      <div style="clear:bothclear;"></div>
      <!-- Second page start --> 
      <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div>
      <div>
         <div>
            <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1>
         </div>
      </div>
      <div style="clear:bothclear;"></div>
      <hr>
      <div>
         <div class="bg-div">
            <div style="width: 100%;color: #0C0C0C;height: 200px;">
               <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div> <img style="width:95%;" src="https://wcs.smartdraw.com/pie-chart/img/slices-similar-in-value.jpg" style=""> </div>
               </div>
               <div style="width:40%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div>
                     <h1 style="font-size: 28px;">Cumilative Utility Cost *</h1>
                     <h1 style="font-size: 20px;">5 years $ ${details.cum5yrloss}</h1>
                     <h1 style="font-size: 24px;">10 years $ ${details.cum10yrloss}</h1>
                     <h1 style="font-size: 28px;">30 years $ ${details.cum30yrloss}</h1>
                  </div>
               </div>
               <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div>
                     <h1 style="font-size: 20px;">Average 30 years Utility Cost WITHOUT solar</h1>
                     <h1 style="font-size: 28px;border: 1px solid;height: 61px;width: 164px;background: #f9b590;margin-left: 59px;">$ ${details.avgutility}</h1>
                  </div>
               </div>
            </div>
            <DIV style="height:100px;"></DIV>
            <div style="width: 100%;color: #0C0C0C;height: 200px;text-align: center;">
               <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div>
                     <h2 style="border: 1px solid;background: #f9b590;padding-top: 18px;padding-bottom: 18px;">Solar System Average Energy cost over 30Years:<b>$ ${details.avgEnergycost}</b></h2>
                     <h2 style="border: 1px solid;background: #f9b590;padding-top: 18px;padding-bottom: 18px;">Est. 30 Yr solar savings:<b>$${details.estsaving}</b></h2>
                     <h2 style="font-size: 18px;">System Design</h2>
                     <h4 style="font-size: 18px;">System Size(kWp):<b>${details.systemsize}</b></h4>
                     <h4 style="font-size: 18px;">Numer of Panels:<b>${details.noofpanels}</b></h4>
                     <h4 style="font-size: 18px;">Estimated Annual Production(kWh):<b>${details.annualprod}</b></h4>
                     <h4 style="font-size: 18px;">Estimated Lifetime Production(kWh):<b>${details.lifeprod$}</b></h4>
                  </div>
               </div>
               <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div> <img src="http://jcharts.sourceforge.net/usersGuide/0.7/images/lineCharts/basicChart.png" style="width: 98%;"></div>
               </div>
            </div>
         </div>
         <div class="footer">
            <table>
               <tr>
                  <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td>
               </tr>
               <tr>
                  <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td>
               </tr>
            </table>
         </div>
      </div>
      <!-- Second page end --> <!-- Third page start --> 
      <div style="clear:bothclear;"></div>
      <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div>
      <div>
         <div>
            <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1>
         </div>
      </div>
      <div style="clear:bothclear;"></div>
      <hr>
      <div>
         <div class="bg-div">
            <div style="height:100px;"></div>
            <div style="width: 100%;color: #0C0C0C;height: 200px;text-align: center;">
               <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div>
                     <div style="width: 95%;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;">
                        <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div class="div-rotate">
                              <h1>30 year<br> investment <br> comparision </h1>
                           </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div>
                              <p>Utility $</p>
                              <p>Solar $</p>
                              <b>SolarSaving vs Utility $</b> <span>(includes solar degradation)</span> 
                           </div>
                        </div>
                        <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div>
                              <p>${details.utility}</p>
                              <p>${details.solar}</p>
                              <b>${details.solarvsUtility}</b> 
                           </div>
                        </div>
                     </div>
                     <div style="width: 95%; margin-top: 28px;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;">
                        <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div class="div-rotate">
                              <h1>Utility vs <br> No/No Loan Period</h1>
                           </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div>
                              <p>Av. Mth Util Bill Svgs $</p>
                              <p>SREC Mo Value $</p>
                              <b>SolarSaving/Mth. $</b> 
                           </div>
                        </div>
                        <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div>
                              <p>${details.avMthUtil}</p>
                              <p>${details.srecMo}</p>
                              <b>${details.solarMth}</b> 
                           </div>
                        </div>
                     </div>
                     <div style="width: 95%; margin-top: 28px;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;">
                        <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div class="div-rotate">
                              <h1>Utility vs Loan<br> -Long Term<br> Loan yr.2</h1>
                           </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div>
                              <p>Solar Loan Mo. Pmt $</p>
                              <p>Yr 2 Mth Util Bill Offset $</p>
                              <p>Av. SREC Mo. Value $</p>
                              <br> <b>Yr 2 Solar Svgs/Mth $</b> 
                           </div>
                        </div>
                        <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div>
                              <p>(${details.solarPmt})</p>
                              <p>${details.billOffset}</p>
                              <p>${details.avSREC}</p>
                              <br> <b>${details.yrSolarSvgs}</b> 
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style="width:50%;float: left;font-family: Calibri, sans-serif;">
                  <div>
                     <h1>Financing Details</h1>
                     <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; margin-bottom: 10px;">
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> <b>Amount to pay to bank at No/No Loan End (Incentive Amount)</b> </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> $ ${details.noLoanEnd} </div>
                        </div>
                     </div>
                     <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0;margin-bottom: 10px;">
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> <b>25 Year Loan</b> </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> $ ${details.loan25Yr} </div>
                        </div>
                     </div>
                     <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0; margin-bottom: 10px;">
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> <b>Loan Interest Rate</b> </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> ${details.loanInterestRate}% </div>
                        </div>
                     </div>
                     <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0; margin-bottom: 10px;">
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> <b>30 Year Return on Investment</b> </div>
                        </div>
                        <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                           <div> ${details.returnonInvestment}% </div>
                        </div>
                     </div>
                     <p style="text-align:left;line-height: 39px;"> The calculations in this proposal are based in part on the information you have provided to your solar consultant. Please review the usage and rate assumptions in the proposal for accuracy. <br> The calculations in this proposal also assume that your electric consumption behavior in the future is consistent with your prior usage as depicted in this proposal.<br> Interest rates and amounts depicted in this proposal are subject to change based upon credit and financing decisions.</p>
                  </div>
               </div>
            </div>
         </div>
         <div class="footer">
            <table>
               <tr>
                  <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td>
               </tr>
               <tr>
                  <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td>
               </tr>
            </table>
         </div>
      </div>
      <!-- Third page end --> <!-- Fourth start --> 
      <div style="clear:bothclear;"></div>
      <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div>
      <div>
         <div>
            <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1>
         </div>
      </div>
      <div style="clear:bothclear;"></div>
      <hr>
      <div>
         <div class="bg-div3">
            <div style="width: 100%;color: #0C0C0C;text-align: center;">
               <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;">
                  <div>
                     <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">The process of going solar</h1>
                     <img src="http://www.breezetree.com/articles/article_images/simple-flow-chart-example.png" style="width:90%">
                  </div>
               </div>
            </div>
            <div style="width:70%;float: left;font-family: Calibri, sans-serif;text-align: left;">
               <div>
                  <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Customer Acknowledgement</h1>
                  <p>I have reviewed and understand this proposal. I understand that the assumptions of this proposal are estimates that may change based upon my credit, financing decisions, final site survey and changes in utility rates.<br> I confirm my interest in this solar solution. I understand that my signature below does not constitue any obligation on my part to purchase the solar solution. <br> <br> <br> Signature: </p>
                  <div style=" height: 177px;background:#f9b590;width: 442px;">
                     <hr style=" padding-top: 129px;">
                  </div>
                  Date: 
               </div>
            </div>
         </div>
         <div class="footer">
            <table>
               <tr>
                  <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td>
               </tr>
               <tr>
                  <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td>
               </tr>
            </table>
         </div>
      </div>
      <!-- Fourth page end -->
   </body>
</html>`