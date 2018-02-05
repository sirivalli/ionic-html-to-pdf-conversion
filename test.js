angular.module('app.controllers')

    .controller('customerViewCtrl', ['$scope', '$stateParams', 'USERSERVICE', '$http', '$ionicLoading', 'ngXml2json', '$ionicPopup', 'SAVERECORDS', '$state', 'SALESDATASERVICE', '_', '$timeout', '$cordovaSQLite', '$rootScope', '$ionicModal', 'UPDATEQuickBaseImm',
        function ($scope, $stateParams, USERSERVICE, $http, $ionicLoading, ngXml2json, $ionicPopup, SAVERECORDS, $state, SALESDATASERVICE, _, $timeout, $cordovaSQLite, $rootScope, $ionicModal, UPDATEQuickBaseImm) {

            $rootScope.WorkisinProgress = true;
            $scope.userData = USERSERVICE.getUser();
            console.log($scope.userData);
            console.log($stateParams);
            var index = parseInt($stateParams.id);
            $scope.indexData = parseInt($stateParams.id);
            var Data = SALESDATASERVICE.getData();
            //var LogicData = SAVERECORDS.getData();
            var SingleData = Data.data[index];
            console.log(SingleData);
            console.log(SingleData.record_id_);
            console.log(SingleData.most_recent_opportunity);
            $scope.goBack = function () {
                window.history.back();
            };

            $scope.hour = '01';
            $scope.minute = '00';
            $scope.ampm = 'AM';
            $scope.increaseHours = function () {
                var i = $scope.hour;

                if (i == 12) {
                    i = 1;
                    $scope.hour = '0' + i;
                }
                else {
                    i++
                    if (i < 10) {
                        $scope.hour = '0' + i;
                    }
                    else {
                        $scope.hour = i;
                    }

                }

            }
            $scope.decreaseHours = function () {
                var i = $scope.hour;

                if (i == 1) {
                    i = 12;
                    $scope.hour = i;
                }
                else {
                    i--;
                    if (i < 10) {
                        $scope.hour = '0' + i;
                    }
                    else {
                        $scope.hour = i;
                    }
                }
            }
            $scope.increaseMinute = function () {
                var i = $scope.minute;

                if (i == 59) {
                    i = 00;
                    $scope.minute = i;
                }
                else {
                    i++
                    if (i < 10) {
                        $scope.minute = '0' + i;
                    }
                    else {
                        $scope.minute = i;
                    }

                }

            }
            $scope.decreaseMinute = function () {
                var i = $scope.minute;

                if (i == 0) {
                    i = 59;
                    $scope.minute = i;
                }
                else {
                    i--;
                    if (i < 10) {
                        $scope.minute = '0' + i;
                    }
                    else {
                        $scope.minute = i;
                    }
                }
            }
            $scope.increaseSession = function () {
                if ($scope.ampm == "AM") {
                    $scope.ampm = "PM";
                }
                else {
                    $scope.ampm = "AM";
                }


            }
            $scope.decreaseSession = function () {
                if ($scope.ampm == 'PM') {
                    $scope.ampm = 'AM';
                }
                else {
                    $scope.ampm = 'PM';
                }
            }
            $scope.set = function () {
                const time = $scope.hour + ':' + $scope.minute + ':' + $scope.ampm;
                $scope.leadData.appTime = time;
                $scope.modal.hide();
            }
            $ionicModal.fromTemplateUrl('./templates/time.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Open the timepicker modal
            $scope.timePicker = function () {
                $scope.modal.show();
            };

            // Triggered in the login modal to close it
            $scope.closeModal = function () {
                $scope.modal.hide();
            };


            //console.log(LogicData);
            // var relationData = _.find(LogicData, function (item) {
            //     if (typeof item.lead !== 'undefined') {
            //         return item.lead.rid == SingleData.record_id_;
            //     }
            // });
            //console.log(relationData);
            // if (typeof relationData == "undefined") {
            //     $ionicPopup.alert({
            //         title: 'Error',
            //         template: "You can not access this record."
            //     }).then(function (res) {
            //         $state.go('app.dashboard');
            //     });
            // } else {
            // ======== Calculation functions ==========
            function PMT(rate, nperiod, pv, fv, type) {
                if (!fv) fv = 0;
                if (!type) type = 0;

                if (rate == 0) return -(pv + fv) / nperiod;

                var pvif = Math.pow(1 + rate, nperiod);
                var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

                if (type == 1) {
                    pmt /= (1 + rate);


                };

                return pmt;
            };

            // function PMT(ir, np, pv, fv, type) {
            //     /*
            //      * ir   - interest rate per month
            //      * np   - number of periods (months)
            //      * pv   - present value
            //      * fv   - future value
            //      * type - when the payments are due:
            //      *        0: end of the period, e.g. end of month (default)
            //      *        1: beginning of period
            //      */
            //     var pmt, pvif;

            //     fv || (fv = 0);
            //     type || (type = 0);

            //     if (ir === 0)
            //         return -(pv + fv)/np;

            //     pvif = Math.pow(1 + ir, np);
            //     pmt = - ir * pv * (pvif + fv) / (pvif - 1);

            //     if (type === 1)
            //         pmt /= (1 + ir);

            //     return pmt;
            // }

            // =======  End ==========
            $scope.leadData = {};

            $scope.leadData.itcInclusion = false;

            $scope.leadData.systemSize = 0
            $scope.leadData.grossCost = 0
            $scope.leadData.systemProductionNetvalue = 0
            $scope.leadData.systemW = 0;
            $scope.leadData.numOfPanels = 0;
            //            $scope.leadData.panelWatts = 0;
            $scope.leadData.systemProduction = 0;

            $scope.leadData.loanPeriod1 = 25;
            $scope.leadData.loanPercentage = 4.99;

            //Rebates
            $scope.leadData.itcRate = 0.3;
            $scope.leadData.taxAbatementRate = 0.25;
            $scope.leadData.stateRebateRate = 0.20;

            // System
            let pannelArray = [{ id: 250, value: 0 }, { id: 255, value: 0 }, { id: 260, value: 0 }, { id: 265, value: 0 }, { id: 270, value: 0 }, { id: 275, value: 0 }, { id: 280, value: 0 }, { id: 285, value: 0 }, { id: 290, value: 0 }, { id: 295, value: 0 }, { id: 300, value: 0 }, { id: 327, value: 0 }, { id: 345, value: 0 },
            { id: 0, value: 0 }, { id: 0, value: 0 }];

            // Customer data
            $scope.leadData.annualUsage = 20920;
            $scope.leadData.srecValue = 150;
            $scope.leadData.loanPlan = 0;
            $scope.leadData.noPeriod = 0.00;

            // Finance data
            $scope.leadData.loanPercentage2 = 0.0599;
            $scope.leadData.loanPeriod2 = 10;
            // TEMP DATA
            $scope.leadData.panelWatts = 270;
            $scope.leadData.numOfPanels = 48;
            $scope.leadData.systemW = 4.62;
            $scope.leadData.systemProduction = 14860;
            // END TEMP DATA

            $scope.leadData.firstName = SingleData.first_name || "";
            $scope.leadData.lastName = SingleData.last_name || "";
            $scope.leadData.address = SingleData.address_with_map__street_1 || "";
            $scope.leadData.city = SingleData.address_with_map__city || "";
            $scope.leadData.state = SingleData.address_with_map__state_region || "";
            $scope.leadData.zip = SingleData.address_with_map__postal_code || "";
            $scope.leadData.phone = SingleData.phone || "";
            $scope.leadData.email = SingleData.email || "";
            $scope.leadData.salesPersonName = SingleData.salePersonName || "";
            $scope.leadData.ridLead = SingleData.record_id_ || "";
            $scope.leadData.uidLead = SingleData.update_id || "";
            $scope.leadData.appDate = SingleData.appDate || "";
            $scope.leadData.appTime = SingleData.appTime || "";
            $scope.leadData.appType = SingleData.appType || "";


            // ========= CUSTOMER DATA TAB ===========
            $scope.$watch('leadData', function (newValue, oldValue, scope) {
                //console.log(newValue);

                // === Rebates ===========================
                $scope.leadData.itcNetvalue = newValue.itcRate * newValue.grossCost;
                $scope.leadData.stateRebateNetvalue = newValue.stateRebateRate * newValue.systemSize;
                $scope.leadData.taxAbatementNetvalue = newValue.grossCost > 20000 ? 5000 : newValue.grossCost * newValue.taxAbatementRate;

                let Incent = 0;
                if (newValue.itcInclusion == 'Yes') {
                    Incent += newValue.itcNetvalue;
                }
                if (newValue.stateRebateInclusion == 'Yes') {
                    Incent += newValue.stateRebateNetvalue;
                }
                if (newValue.taxAbatementInclusion == 'Yes') {
                    Incent += newValue.taxAbatementNetvalue;
                }
                $scope.leadData.incentves = Incent;
                $scope.leadData.netFinanced = newValue.grossCost - Incent;
                // === End Rebates ===========================
                // ======= Finanicing ======================
                $scope.docfinance = [{
                    id: "Sunnova",
                    value: "Sunnova"
                }, {
                    id: "Asset Sale",
                    value: "Asset Sale"
                }];
                $scope.docabove = [{
                    id: "Below 10k",
                    value: "Below 10k"
                }, {
                    id: "10k or above",
                    value: "10k or above"
                }];
                $scope.docUtility = [{
                    id: "JCP%26L",
                    value: "JCP&L"
                }, {
                    id: "PSEG",
                    value: "PSEG"
                },
                {
                    id: "ACE",
                    value: "ACE"
                }];
                // === End Finanicing ===========================

                // ======= System ======================
                $scope.leadData.systemSize = newValue.panelWatts * newValue.numOfPanels;
                $scope.leadData.grossCost = $scope.leadData.systemSize * newValue.systemW;
                $scope.leadData.systemProductionNetvalue = newValue.systemProduction / $scope.leadData.systemSize;

                let SB36;
                if (newValue.period == 12) {
                    SB36 = 0.005;
                } else if (newValue.period == 15) {
                    SB36 = 0.01;
                } else {
                    SB36 = 0.015;
                }
                SB36 = SB36 * $scope.leadData.grossCost;

                let SB23 = 0.1;
                let SB35 = SB23 * $scope.leadData.grossCost;

                let netV = ($scope.leadData.grossCost - SB36 - SB35) / $scope.leadData.systemSize;

                $scope.leadData.systemWNetvalue = netV;

                // ===== End System =============

                // ==== Customer Data ==========================
                //Caluclate 25yrAverage $/kwah

                let rate, nperiod, pv, PMTValue;
                if (newValue.loanPeriod1 == 25) {
                    rate = parseFloat(newValue.loanPercentage) / 12;
                } else {
                    rate = parseFloat(newValue.loanPercentage2) / 12;
                }
                nperiod = parseFloat(newValue.loanPeriod1) * 12;

                pv = $scope.leadData.netFinanced;

                //console.log(rate, nperiod, pv);
                PMTValue = PMT(rate, nperiod, pv);
                PMTValue = PMTValue.toFixed(2);
                //console.log(PMTValue);

                let SRECTotalAverage;
                pannelArray.forEach(function (item, i) {
                    if (i == 0) {
                        pannelArray[i].value = newValue.systemProduction;
                    } else {
                        pannelArray[i].value = pannelArray[i - 1].value * 0.995;
                    }
                });
                //console.log(pannelArray);
                let sum = 0;
                pannelArray.forEach(function (item, i) {
                    // console.log(item.value, newValue.srecValue);
                    let TValue = (item.value / 1000) * newValue.srecValue;
                    // console.log(SRECTValue.toFixed(2));

                    let value = TValue.toFixed(2) / 12;
                    //console.log(SRECValue.toFixed(2));
                    item.SRECValue = parseFloat(value.toFixed(2));
                    sum += item.SRECValue;
                });
                SRECTotalAverage = (sum / pannelArray.length).toFixed(2);
                //console.log(SRECTotalAverage);
                SRECTotalAverage = parseFloat(SRECTotalAverage);
                let E53 = (parseFloat(PMTValue) + SRECTotalAverage);
                E53 = parseFloat(E53.toFixed(2));
                //console.log('E53 value ', E53);
                // 1 to 10 years
                let years10 = (E53 * 12) * 10; // 12 months, up to 10 years
                //console.log('1 value ', years10);
                // 1 to 5 years
                let years05 = (newValue.loanPeriod1 == 25) ? (E53 * 12) * 5 : SRECTotalAverage * 12;  // 12 months, 5 years
                //console.log('2 value ', years05);
                // 1 to 10 years
                let years110 = (newValue.loanPeriod1 == 25) ? ((E53 - SRECTotalAverage) * 12) * 10 : 0;  // 12 months, 10 years
                //console.log('3 value ', years110);

                let k35 = (years10 + years05 + years110).toFixed(2);
                k35 = parseFloat(k35);
                //console.log(k35);

                // Find c35 value
                let c35Array = [];
                for (var i = 0; i < 30; i++) {
                    // console.log(i);
                    if (i == 0) {
                        c35Array.push(newValue.systemProduction);
                    } else {
                        c35Array.push(c35Array[i - 1] * 0.995);
                    }
                }
                //console.log(c35Array);
                let c35sum = 0;
                c35Array.forEach(function (item, i) {
                    c35sum += item;
                });
                c35sum = Math.round(c35sum);
                //console.log(c35sum);


                $scope.leadData.yrAverage = -(k35) / c35sum;
                $scope.leadData.duringPayment = E53;
                $scope.leadData.paymentAfter = (newValue.loanPeriod1 == 25) ? PMTValue : 0;
                $scope.leadData.solorUtility1 = (newValue.systemProduction / newValue.annualUsage).toFixed(2);

                $scope.leadData.solorUtility2 = (1 - ($scope.leadData.solorUtility1)).toFixed(2);
                //console.log($scope.leadData.solorUtility2);
                //((newValue.systemProduction/1000)* newValue.srecValue)/12;



                // ==== End Customer Data ==========================

            }, true);



            // ========= CUSTOMER DATA TAB END ===========

            //            $scope.getData = function (info) {
            //                console.log(info);
            //                var lead = "ticket=" + $scope.userData.ticket + "&apptoken=" + APPTOKEN +
            //                    "&_fid_6=" + info.firstName +
            //                    "&_fid_56=" + info.lastName +
            //                    "&_fid_11=" + info.address +
            //                    "&_fid_13=" + info.city +
            //                    "&_fid_14=" + info.state +
            //                    "&_fid_15=" + info.zip +
            //                    "&_fid_17=" + info.phone +
            //                    "&_fid_20=" + info.email +
            //                    "&_fid_62=" + info.salesPersonName;
            //                console.log(lead);
            //
            //
            //                $ionicLoading.show({
            //                    template: '<ion-spinner></ion-spinner>'
            //                });
            //                var startTime = new Date().getTime();
            //                $http.post(QURL + 'db/' + LEADS_TABLE + '?a=API_EditRecord', lead, { timeout: TIMEOUT }).then(
            //                    function (result) {
            //                        console.log(result);
            //                        var resultData = ngXml2json.parser(result.data);
            //                        console.log(resultData);
            //                        if (resultData.qdbapi.errcode == 0) {
            //                            //Success
            //                            console.log('success');
            //                            // Insert opportunity
            //                            var opportunity = "ticket=" + $scope.userData.ticket + "&apptoken=" + APPTOKEN +
            //                                "&_fid_118=" + resultData.qdbapi.rid +
            //                                "&_fid_80=" + "Proposal Request";
            //                            console.log(opportunity);
            //
            //                            var startTime3 = new Date().getTime();
            //                            $http.post(QURL + 'db/' + OPPORTUNITIES + '?a=API_EditRecord', opportunity, { timeout: TIMEOUT }).then(
            //                                function (result) {
            //                                    $ionicLoading.hide();
            //                                    console.log(result);
            //                                    var resultData3 = ngXml2json.parser(result.data);
            //                                    console.log(resultData3);
            //                                    if (resultData3.qdbapi.errcode == 0) {
            //                                        //Success
            //                                        console.log('success');
            //
            //                                        // Insert proposal
            //                                        var proposal = "ticket=" + $scope.userData.ticket + "&apptoken=" + APPTOKEN +
            //                                            "&_fid_72=" + info.ageOfRoof +
            //                                            "&_fid_26=" + info.roofType +
            //                                            //  "&_fid_10=" + info.customerBill +
            //                                            //  "&_fid_11=" + info.customerBill2 +
            //                                            "&_fid_9=" + info.annualUsage +
            //                                            "&_fid_73=" + info.hoa +
            //                                            "&_fid_31=" + info.customerProposalNote +
            //                                            "&_fid_44=" + info.utility +
            //                                            "&_fid_21=" + info.lease +
            //                                            "&_fid_22=" + info.ownership +
            //                                            "&_fid_23=" + info.cash +
            //                                            "&_fid_82=" + info.loan +
            //                                            "&_fid_25=" + info.pmtEscalation +
            //                                            "&_fid_90=" + info.panelWatts +
            //                                            "&_fid_91=" + info.numOfPanels +
            //                                            // "&_fid_92=" + info.systemSize +
            //                                            "&_fid_93=" + info.systemW +
            //                                            "&_fid_94=" + info.grossCost +
            //                                            "&_fid_40=" + resultData3.qdbapi.rid +
            //                                            "&_fid_39=" + resultData3.qdbapi.rid +
            //                                            "&_fid_95=" + info.systemProduction;
            //
            //                                        console.log(proposal);
            //                                        var startTime2 = new Date().getTime();
            //                                        $http.post(QURL + 'db/' + PROPOSALS + '?a=API_EditRecord', proposal, { timeout: TIMEOUT }).then(
            //                                            function (result) {
            //                                                $ionicLoading.hide();
            //                                                console.log(result);
            //                                                var resultData2 = ngXml2json.parser(result.data);
            //                                                console.log(resultData2);
            //                                                if (resultData2.qdbapi.errcode == 0) {
            //                                                    //Success
            //                                                    console.log('success');
            //                                                    var objD = {
            //                                                        lead: {
            //                                                            "update_id": resultData.qdbapi.update_id,
            //                                                            "rid": resultData.qdbapi.rid
            //                                                        },
            //                                                        proposal: {
            //                                                            "update_id": resultData2.qdbapi.update_id,
            //                                                            "rid": resultData2.qdbapi.rid
            //                                                        },
            //                                                        opportunity: {
            //                                                            "update_id": resultData3.qdbapi.update_id,
            //                                                            "rid": resultData3.qdbapi.rid
            //                                                        }
            //                                                    };
            //                                                    SAVERECORDS.setData(objD);
            //                                                    $state.go('app.dashboard');
            //                                                } else {
            //                                                    //no user found
            //                                                    $ionicPopup.alert({
            //                                                        title: 'Error',
            //                                                        template: resultData2.qdbapi.errdetail
            //                                                    });
            //                                                }
            //                                            },
            //                                            function (error) {
            //                                                $ionicLoading.hide();
            //                                                var respTime2 = new Date().getTime() - startTime2;
            //                                                if (respTime2 >= TIMEOUT) {
            //                                                    var alertPopup = $ionicPopup.alert({
            //                                                        title: 'Failed!',
            //                                                        template: 'Server is busy, please try again.'
            //                                                    });
            //                                                } else {
            //                                                    $ionicPopup.alert({
            //                                                        title: 'Error',
            //                                                        template: "Something went wrong, please try again"
            //                                                    });
            //                                                }
            //                                            });
            //                                        // End proposal
            //                                    } else {
            //                                        //no user found
            //                                        $ionicPopup.alert({
            //                                            title: 'Error',
            //                                            template: resultData3.qdbapi.errdetail
            //                                        });
            //                                    }
            //                                },
            //                                function (error) {
            //                                    $ionicLoading.hide();
            //                                    var respTime3 = new Date().getTime() - startTime3;
            //                                    if (respTime3 >= TIMEOUT) {
            //                                        var alertPopup = $ionicPopup.alert({
            //                                            title: 'Failed!',
            //                                            template: 'Server is busy, please try again.'
            //                                        });
            //                                    } else {
            //                                        $ionicPopup.alert({
            //                                            title: 'Error',
            //                                            template: "Something went wrong, please try again"
            //                                        });
            //                                    }
            //                                });
            //                            // End opportunity
            //                        } else {
            //                            //no user found
            //                            $ionicLoading.hide();
            //                            $ionicPopup.alert({
            //                                title: 'Error',
            //                                template: resultData.qdbapi.errdetail
            //                            });
            //                        }
            //                    },
            //                    function (error) {
            //                        $ionicLoading.hide();
            //                        var respTime = new Date().getTime() - startTime;
            //                        if (respTime >= TIMEOUT) {
            //                            var alertPopup = $ionicPopup.alert({
            //                                title: 'Failed!',
            //                                template: 'Server is busy, please try again.'
            //                            });
            //                        } else {
            //                            $ionicPopup.alert({
            //                                title: 'Error',
            //                                template: "Something went wrong, please try again"
            //                            });
            //                        }
            //                    });
            //            }




            //}




            // GET OPPORTUNITIES DATA
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            var opp_AppTok = "ticket=" + $scope.userData.ticket + "&apptoken=" + APPTOKEN + "&rid=" + SingleData.most_recent_opportunity;
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            var startTime = new Date().getTime();
            $http.post(QURL + 'db/' + OPPORTUNITIES + '?a=API_GetRecordInfo', opp_AppTok, { timeout: TIMEOUT }).then(
                function (result) {
                    //$ionicLoading.hide();
                    console.log(result);
                    //ngXml2json.parser(XML)
                    var resultData = ngXml2json.parser(result.data);
                    console.log(resultData);
                    if (resultData.qdbapi.errcode == 0) {
                        //Success

                        var a = resultData.qdbapi.field;
                        if (Array.isArray(a)) {
                            a.reverse();
                            $scope.opportunityData = a;
                        } else {
                            $scope.opportunityData = [];
                            $scope.opportunityData.push(resultData.qdbapi.feild);
                        }
                        console.log($scope.opportunityData);
                        //                        $scope.opporData = _.find($scope.opportunityData, function (item) {
                        //                            if (typeof item.record_id_ !== 'undefined') {
                        //                                return item.record_id_ == SingleData.most_recent_opportunity;

                        //                        });


                        $scope.leadData.docuS_financing = (_.findWhere($scope.opportunityData, { fid: 351 })).value;
                        $scope.leadData.docuS_abovebelow = (_.findWhere($scope.opportunityData, { fid: 356 })).value;
                        var uti = ((_.findWhere($scope.opportunityData, { fid: 357 })).value == "JCP&amp;L") ? "JCP%26L" : (_.findWhere($scope.opportunityData, { fid: 357 })).value;
                        $scope.leadData.docuS_utility = uti;
                        $scope.leadData.ridOpp = (_.findWhere($scope.opportunityData, { fid: 3 })).value;
                        $scope.leadData.uidOpp = (_.findWhere($scope.opportunityData, { fid: 2 })).value;
                        // DocuSign
                        var res = (_.findWhere($scope.opportunityData, { fid: 320 })).value.slice(34);
                        var stamp = res.split(',')
                        var dcodedstamp = stamp[0];
                        dcodedstamp = dcodedstamp.replace(/&amp;/g, '&');
                        $scope.leadData.stampThePDF = dcodedstamp;

                        var res2 = (_.findWhere($scope.opportunityData, { fid: 340 })).value.slice(34);
                        var pdf = res2.split(',');
                        var dcodedpdf = pdf[0];
                        dcodedpdf = dcodedpdf.replace(/&amp;/g, '&');
                        $scope.leadData.sendViaDocuSign = dcodedpdf;
                        // END DocuSign

                        // PROPOSAL DATA
                        var prop_appTok = "ticket=" + $scope.userData.ticket + "&apptoken=" + APPTOKEN + "&rid=" + (_.findWhere($scope.opportunityData, { fid: 297 })).value;
                        var startTime2 = new Date().getTime();

                        $http.post(QURL + 'db/' + PROPOSALS + '?a=API_GetRecordInfo', prop_appTok, { timeout: TIMEOUT }).then(
                            function (result) {
                                $ionicLoading.hide();
                                console.log(result);
                                //ngXml2json.parser(XML)
                                var resultData2 = ngXml2json.parser(result.data);
                                console.log(resultData2);
                                if (resultData2.qdbapi.errcode == 0) {
                                    //Success

                                    var b = resultData2.qdbapi.field;
                                    if (Array.isArray(b)) {
                                        b.reverse();
                                        $scope.proposalData = b;
                                    } else {
                                        $scope.proposalData = [];
                                        $scope.proposalData.push(resultData2.qdbapi.field);
                                    }
                                    $scope.proposalData2 = resultData2;
                                    console.log($scope.proposalData);
                                    console.log($scope.proposalData2);
                                    console.log($scope.proposalData2.qdbapi.rid);
                                    //                                        $scope.proData = _.find($scope.proposalData, function (item) {
                                    //                                            if (typeof item.record_id_ !== 'undefined') {
                                    //                                                return item.record_id_ == $scope.opporData.proposal_maximum_record_id_;
                                    //                                            }
                                    //                                        });
                                    console.log($scope.proposalData);


                                    $scope.leadData.ageOfRoof = (_.findWhere($scope.proposalData, { fid: 72 })).value;
                                    $scope.leadData.roofType = (_.findWhere($scope.proposalData, { fid: 26 })).value;
                                    // $scope.leadData.appTime = (_.findWhere($scope.proposalData, {fid:379})).value;
                                    //                                            $scope.leadData.panelWatts = String($scope.proposalData[7].value);
                                    $scope.leadData.panelWatts = String((_.findWhere($scope.proposalData, { fid: 90 })).value);
                                    console.log($scope.leadData.panelWatts);
                                    $scope.leadData.numOfPanels = (_.findWhere($scope.proposalData, { fid: 91 })).value;
                                    $scope.leadData.systemW = (_.findWhere($scope.proposalData, { fid: 93 })).value;
                                    $scope.leadData.grossCost = (_.findWhere($scope.proposalData, { fid: 94 })).value;
                                    $scope.leadData.systemProduction = (_.findWhere($scope.proposalData, { fid: 95 })).value;

                                    $scope.leadData.hoa = (_.findWhere($scope.proposalData, { fid: 73 })).value == 1 ? true : false;
                                    $scope.leadData.lease = (_.findWhere($scope.proposalData, { fid: 21 })).value == 1 ? true : false;
                                    $scope.leadData.ownership = (_.findWhere($scope.proposalData, { fid: 22 })).value == 1 ? true : false;
                                    $scope.leadData.cash = (_.findWhere($scope.proposalData, { fid: 23 })).value == 1 ? true : false;
                                    $scope.leadData.loan = (_.findWhere($scope.proposalData, { fid: 82 })).value == 1 ? true : false;
                                    $scope.leadData.pmtEscalation = String((_.findWhere($scope.proposalData, { fid: 82 })).value);

                                    $scope.leadData.customerProposalNote = (_.findWhere($scope.proposalData, { fid: 31 })).value;
                                    $scope.leadData.utility = "";
                                    $scope.leadData.solorUtility1 = (_.findWhere($scope.proposalData, { fid: 98 })).value;
                                    $scope.leadData.noPeriod = (_.findWhere($scope.proposalData, { fid: 99 })).value;

                                    $scope.leadData.annualUsage = (_.findWhere($scope.proposalData, { fid: 9 })).value;
                                    $scope.leadData.ridProp = $scope.proposalData2.qdbapi.rid;
                                    console.log($scope.leadData.ridProp);
                                    $scope.leadData.uidProp = $scope.proposalData2.qdbapi.update_id;
                                    console.log($scope.leadData.uidProp);

                                    // Appointment data
                                    var app_appTok = "ticket=" + $scope.userData.ticket + "&apptoken=" + APPTOKEN + "&rid=" + (_.findWhere($scope.opportunityData, { fid: 379 })).value;
                                    var startTime2 = new Date().getTime();

                                    $http.post(QURL + 'db/' + APPOINTMENTS + '?a=API_GetRecordInfo', app_appTok, { timeout: TIMEOUT }).then(
                                        function (result) {
                                            $ionicLoading.hide();
                                            console.log(result);
                                            //ngXml2json.parser(XML)
                                            var resultDataA = ngXml2json.parser(result.data);
                                            console.log(resultDataA);
                                            if (resultDataA.qdbapi.errcode == 0) {
                                                var a = resultDataA.qdbapi.field;
                                                if (Array.isArray(a)) {
                                                    a.reverse();
                                                    $scope.appointmentData = a;
                                                } else {
                                                    $scope.appointmentData = [];
                                                    $scope.appointmentData.push(resultDataA.qdbapi.feild);
                                                }
                                                console.log($scope.appointmentData);
                                                $scope.appointmentData2 = resultDataA;
                                                console.log($scope.appointmentData2.qdbapi.rid);
                                                $scope.leadData.appDate = new Date((_.findWhere($scope.appointmentData, { fid: 8 })).value);
                                                $scope.leadData.appTime = String((_.findWhere($scope.appointmentData, { fid: 35 })).printable);
                                                $scope.leadData.appType = (_.findWhere($scope.appointmentData, { fid: 7 })).value;
                                                $scope.leadData.ridApp = $scope.appointmentData2.qdbapi.rid;
                                                console.log($scope.leadData.ridApp);
                                                $scope.leadData.uidApp = $scope.appointmentData2.qdbapi.update_id;
                                                console.log($scope.leadData.uidApp);


                                            }
                                        });
                                    $ionicLoading.hide();
                                } else {
                                    //no user found
                                    $ionicLoading.hide();
                                    $ionicPopup.alert({
                                        title: 'Sorry',
                                        template: "Something went wrong, Please login again"
                                    }).then(function (res) {
                                        $state.go('login');
                                    });
                                }
                            },
                            function (error) {
                                $ionicLoading.hide();
                                var respTime2 = new Date().getTime() - startTime2;
                                if (respTime2 >= TIMEOUT) {
                                    var alertPopup = $ionicPopup.alert({
                                        title: 'Failed!',
                                        template: 'Server is busy, please try again.'
                                    }).then(function (res) {
                                        $state.go('app.dashboard');
                                    });
                                } else {
                                    $ionicPopup.alert({
                                        title: 'Error',
                                        template: "Something went wrong, please try again"
                                    }).then(function (res) {
                                        $state.go('app.dashboard');
                                    });
                                }
                            });
                        //END PROPOSAL DATA
                        //                                } else {
                        //                                    //no user found
                        //                                    $ionicLoading.hide();
                        //                                    $ionicPopup.alert({
                        //                                        title: 'Sorry',
                        //                                        template: "Something went wrong, Please login again"
                        //                                    }).then(function (res) {
                        //                                        $state.go('login');
                        //                                    });
                        //                                }
                        //                            },
                        //                            function (error) {
                        //                                $ionicLoading.hide();
                        //                                opLoading = true;
                        //                                var respTime = new Date().getTime() - startTime;
                        //                                if (respTime >= TIMEOUT) {
                        //                                    var alertPopup = $ionicPopup.alert({
                        //                                        title: 'Failed!',
                        //                                        template: 'Server is busy, please try again.'
                        //                                    }).then(function (res) {
                        //                                        $state.go('app.dashboard');
                        //                                    });
                        //                                } else {
                        //                                    $ionicPopup.alert({
                        //                                        title: 'Error',
                        //                                        template: "Something went wrong, please try again"
                        //                                    }).then(function (res) {
                        //                                        $state.go('app.dashboard');
                        //                                    });
                        //                                }
                        //                            });
                        // END APPOINTMENTS

                    } else {
                        //no user found
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Sorry',
                            template: "Something went wrong, Please login again"
                        }).then(function (res) {
                            $state.go('login');
                        });
                    }
                },
                function (error) {
                    $ionicLoading.hide();
                    opLoading = true;
                    var respTime = new Date().getTime() - startTime;
                    if (respTime >= TIMEOUT) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Failed!',
                            template: 'Server is busy, please try again.'
                        }).then(function (res) {
                            $state.go('app.dashboard');
                        });
                    } else {
                        $ionicPopup.alert({
                            title: 'Error',
                            template: "Something went wrong, please try again"
                        }).then(function (res) {
                            $state.go('app.dashboard');
                        });
                    }
                });
            // END OPPORTUNITIES
            //sqlite code
            $scope.saveLocal = function (info) {

                $scope.modal.hide();
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner>'
                });

                var lead = JSON.stringify(info);
                if ($rootScope.isOnline == true) {
                    console.log("user online");
                    UPDATEQuickBaseImm.setData2(info);
                    $ionicLoading.hide();
                    $state.go('app.dashboard');
                }
                else {
                    console.log("user offline");
                    var query = "INSERT INTO editData (data,status) VALUES (?,?)";
                    $cordovaSQLite.execute(db, query, [lead, 0]).then(function (res) {
                        console.log("INSERT id -> " + res.insertId);
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Success',
                            template: "Record has been saved successfully"
                        })
                            .then(function (res) {
                                $state.go('app.dashboard');
                            });
                    }, function (err) {
                        console.error(err);
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error',
                            template: "Something went wrong, please try again"
                        });
                    });
                }
                //                            var query = "INSERT INTO editData (data,status) VALUES (?,?)";
                //                            $cordovaSQLite.execute(db, query, [lead, 0]).then(function (res) {
                //                                console.log("INSERT id -> " + res.insertId);
                //                                $ionicLoading.hide();
                //                                $ionicPopup.alert({
                //                                    title: 'Success',
                //                                    template: "Record has been saved successfully"
                //                                })
                //                                    .then(function (res) {
                //                                        $state.go('app.dashboard');
                //                                    });
                //                            }, function (err) {
                //                                console.error(err);
                //                                $ionicLoading.hide();
                //                                $ionicPopup.alert({
                //                                    title: 'Error',
                //                                    template: "Something went wrong, please try again"
                //                                });
                //                            });
            }


            $scope.clearDB = function () {
                let query2 = "DELETE FROM editData";
                $cordovaSQLite.execute(db, query2, []).then(function (res) {
                    console.log(res);
                }, function (err) {
                    console.error(err);
                });
            };

            document.addEventListener('deviceready', function () {

                var details = {
                    preparedOn: 'July 6 1992',
                   
                    name: SingleData.full_name,
                    address: SingleData.address_with_map__street_1,
                    city: SingleData.address_with_map__city,
                    state: SingleData.address_with_map__state_region,
                    salesConsultant: 'srivalli',
                    contact : 99999999999,
                    email: 'srivalli.valluripalli@wilmertech.com',
                    cum5yrloss: '11,790.93',
                    cum10yrloss: '25,121.52',
                    cum30yrloss: '98,276.40',
                    avgutility: 0.22,
                    avgEnergycost: 0.099,
                    estsaving: 42.911,
                    noofpanels: 48,
                    annualprod: '14,860',
                    lifeprod: '414,938',
                    utility: '76,496.51',
                    solar: '41,142.14',
                    solarvsUtility: '37,598.23',
                    avMthUtil: 196.40,
                    srecMo: 179.39,
                    solarMth: 375.78,
                    solarPmt: 244.77,
                    billOffset: 191.63,
                    avSREC: 179.39,
                    yrSolarSvgs: 126.25,
                    noLoanEnd: '17,962.56',
                    loan25Yr: '41,912.64',
                    loanInterestRate: 4.99,
                    returnonInvestment: 91.39


                }
                console.log(details.name);
                if (ionic.Platform.isIOS()) {
                    console.log(" device is IOS");
                    var htmlDATA = '<!DOCTYPE html><html><head> <title>Page Title</title></head><style> * { font-size: 14px; } .bg-img { background-repeat: no-repeat; background-size: cover; background-image: url(https://image.freepik.com/free-psd/abstract-background-design_1297-87.jpg); background-color: #ccc; height: 940px; } .logo { padding-top: 60%; text-align: center } .logo img { width: 70% } .content { text-align: center; padding: 20px 0 0 0; max-width: 1010px; margin: 0 auto; } .heading { color: white; font-family: Calibri, sans-serif; font-size: 22px; } .footer { background-color: #ffaf00; font-size: 10px; } .bg-div { height: 870px; } .bg-div3 { height: 870px; } .bg-div4 { height: 860px; } .div-rotate { /* Rotate div */ -ms-transform: rotate(270deg); /* IE 9 */ -webkit-transform: rotate(270deg); /* Safari 3-8 */ transform: rotate(270deg); padding-top: 45px; padding-right: 0px; height: 90%; }</style><body> <!-- First page --> <div> <div class="bg-img"> <div class="logo"> <img src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png"> </div> <div class="content"> <h1 class="heading">Delivering Energy Independence, one roof at a time </h1> <div style="padding-top:10px;"></div> <div style="width: 100%;color: #fff;"> <div style="width:30%;float: left;font-family: Calibri, sans-serif;"> <div> <div style="">Proposal Details</div> <div style="font-size: 11px;"> <div style="padding-top: 9px; padding-bottom: 9px;">Prepared on:' + details.preparedOn + '</div> <div style="padding-top: 9px; padding-bottom: 9px;">System Size: kWp ' + details.systemsize + '</div> </div> </div> </div> <div style="width:30%;float: left;font-family: Calibri, sans-serif;"> <div> <div>Customer Details</div> <div style="font-size: 11px;"> <div style="padding-top: 9px; padding-bottom: 9px;"> Name:' + details.name + ' </div> <div style="padding-top: 9px; padding-bottom: 9px;">Address:' + details.address + '</div> <div style="padding-top: 9px; padding-bottom: 9px;">City/State:' + details.city + '/' + details.state + '</div> </div> </div> </div> <div style="width:30%;float: left;font-family: Calibri, sans-serif;"> <div> <div>Proposed by</div> <div style="font-size: 11px;"> <div style="padding-top: 9px; padding-bottom: 9px;">Sales Consultant: ' + details.salesConsultant + '</div> <div style="padding-top: 9px; padding-bottom: 9px;">Contact:' + details.contact + ' </div> <div style="padding-top: 9px; padding-bottom: 9px;">Email: ' + details.email + '</div> </div> </div> </div> </div> <div style="clear:both;"></div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- End First page --> <div style="clear:bothclear;"></div> <!-- Second page start --> <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div> <div> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1> </div> </div> <div style="clear:bothclear;"></div> <hr> <div> <div class="bg-div"> <div style="width: 100%;color: #0C0C0C;height: 200px;"> <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <img style="width:95%;" src="https://wcs.smartdraw.com/pie-chart/img/slices-similar-in-value.jpg" style=""> </div> </div> <div style="width:40%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h1 style="font-size: 28px;">Cumilative Utility Cost *</h1> <h1 style="font-size: 20px;">5 years $ ' + details.cum5yrloss + '</h1> <h1 style="font-size: 24px;">10 years $ ' + details.cum10yrloss + '</h1> <h1 style="font-size: 28px;">30 years $ ' + details.cum30yrloss + '</h1> </div> </div> <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h1 style="font-size: 20px;">Average 30 years Utility Cost WITHOUT solar</h1> <h1 style="font-size: 28px;border: 1px solid;height: 61px;width: 164px;background: #f9b590;margin-left: 59px;">$' + details.avgutility + '</h1> </div> </div> </div> <DIV style="height:100px;"></DIV> <div style="width: 100%;color: #0C0C0C;height: 200px;text-align: center;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h2 style="border: 1px solid;background: #f9b590;padding-top: 18px;padding-bottom: 18px;">Solar System Average Energy cost over 30Years:<b>$' + details.avgEnergycost + '</b></h2> <h2 style="border: 1px solid;background: #f9b590;padding-top: 18px;padding-bottom: 18px;">Est. 30 Yr solar savings:<b>$' + details.estsaving + '</b></h2> <h2 style="font-size: 18px;">System Design</h2> <h4 style="font-size: 18px;">System Size(kWp):<b>' + details.systemsize + '</b></h4> <h4 style="font-size: 18px;">Numer of Panels:<b>' + details.noofpanels + '</b></h4> <h4 style="font-size: 18px;">Estimated Annual Production(kWh):<b>' + details.annualprod + '</b></h4> <h4 style="font-size: 18px;">Estimated Lifetime Production(kWh):<b>' + details.lifeprod + '</b></h4> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <img src="http://jcharts.sourceforge.net/usersGuide/0.7/images/lineCharts/basicChart.png" style="width: 98%;"></div> </div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- Second page end --> <!-- Third page start --> <div style="clear:bothclear;"></div> <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div> <div> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1> </div> </div> <div style="clear:bothclear;"></div> <hr> <div> <div class="bg-div"> <div style="height:100px;"></div> <div style="width: 100%;color: #0C0C0C;height: 200px;text-align: center;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <div style="width: 95%;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;"> <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div class="div-rotate"> <h1>30 year<br> investment <br> comparision </h1> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>Utility $</p> <p>Solar $</p> <b>SolarSaving vs Utility $</b> <span>(includes solar degradation)</span> </div> </div> <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>' + details.utility + '</p> <p>' + details.solar + '</p> <b>' + details.solarvsUtility + '</b> </div> </div> </div> <div style="width: 95%; margin-top: 28px;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;"> <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div class="div-rotate"> <h1>Utility vs <br> No/No Loan Period</h1> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>Av. Mth Util Bill Svgs $</p> <p>SREC Mo Value $</p> <b>SolarSaving/Mth. $</b> </div> </div> <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>' + details.avMthUtil + '</p> <p>' + details.srecMo + '</p> <b>' + details.solarMth + '</b> </div> </div> </div> <div style="width: 95%; margin-top: 28px;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;"> <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div class="div-rotate"> <h1>Utility vs Loan<br> -Long Term<br> Loan yr.2</h1> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>Solar Loan Mo. Pmt $</p> <p>Yr 2 Mth Util Bill Offset $</p> <p>Av. SREC Mo. Value $</p> <br> <b>Yr 2 Solar Svgs/Mth $</b> </div> </div> <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>(' + details.solarPmt + ')</p> <p>' + details.billOffset + '</p> <p>' + details.avSREC + '</p> <br> <b>' + details.yrSolarSvgs + '</b> </div> </div> </div> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;"> <div> <h1>Financing Details</h1> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>Amount to pay to bank at No/No Loan End (Incentive Amount)</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> $' + details.noLoanEnd + ' </div> </div> </div> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0;margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>25 Year Loan</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> $' + details.loan25Yr + ' </div> </div> </div> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0; margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>Loan Interest Rate</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> ' + details.loanInterestRate + '% </div> </div> </div> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0; margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>30 Year Return on Investment</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> ' + details.returnonInvestment + '% </div> </div> </div> <p style="text-align:left;line-height: 39px;"> The calculations in this proposal are based in part on the information you have provided to your solar consultant. Please review the usage and rate assumptions in the proposal for accuracy. <br> The calculations in this proposal also assume that your electric consumption behavior in the future is consistent with your prior usage as depicted in this proposal.<br> Interest rates and amounts depicted in this proposal are subject to change based upon credit and financing decisions.</p> </div> </div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- Third page end --> <!-- Fourth start --> <div style="clear:bothclear;"></div> <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div> <div> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1> </div> </div> <div style="clear:bothclear;"></div> <hr> <div> <div class="bg-div3"> <div style="width: 100%;color: #0C0C0C;text-align: center;"> <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">The process of going solar</h1> <img src="http://www.breezetree.com/articles/article_images/simple-flow-chart-example.png" style="width:90%"></div> </div> </div> <div style="width:70%;float: left;font-family: Calibri, sans-serif;text-align: left;"> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Customer Acknowledgement</h1> <p>I have reviewed and understand this proposal. I understand that the assumptions of this proposal are estimates that may change based upon my credit, financing decisions, final site survey and changes in utility rates.<br> I confirm my interest in this solar solution. I understand that my signature below does not constitue any obligation on my part to purchase the solar solution. <br> <br> <br> Signature: </p> <div style=" height: 177px;background:#f9b590;width: 442px;"> <hr style=" padding-top: 129px;"> </div> Date: </div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- Fourth page end --></body></html>';

                    $scope.viewPdf = function () {
                        cordova.plugins.pdf.htmlToPDF({
                            data: htmlDATA,
                            documentSize: 'A4',
                            landscape: 'portrait',
                            type: 'base64',
                            fileName: 'v8-tutorial.pdf'
                        }, function (base64) {
                            console.log('success', base64)

                            var binaryString = window.atob(base64);
                            var binaryLen = binaryString.length;
                            var bytes = new Uint8Array(binaryLen);
                            for (var i = 0; i < binaryLen; i++) {
                                var ascii = binaryString.charCodeAt(i);
                                bytes[i] = ascii;
                            }
                            var blob = new Blob([bytes], { type: 'application/pdf' });
                            $scope.pdfUrl = URL.createObjectURL(blob);
                            console.log('blob', blob);
                            console.log('pdfURL', $scope.pdfUrl);
                            //window.open($scope.pdfUrl);
                            cordova.InAppBrowser.open($scope.pdfUrl, '_blank', 'location=no');
                        })
                    };
                    $scope.sharePdf = function () {
                        cordova.plugins.pdf.htmlToPDF({
                            data: htmlDATA,
                            type: 'share',
                            documentSize: 'A4',
                            landscape: 'portrait',
                            type: 'base64',//Open a context menu and ask the user what to do next (print, mail, etc..).
                            fileName: 'v8-tutorial.pdf'
                        }, function (base64) {
                            console.log('success', base64)

                            var binaryString = window.atob(base64);
                            var binaryLen = binaryString.length;
                            var bytes = new Uint8Array(binaryLen);
                            for (var i = 0; i < binaryLen; i++) {
                                var ascii = binaryString.charCodeAt(i);
                                bytes[i] = ascii;
                            }
                            var blob = new Blob([bytes], { type: 'application/pdf' });
                            $scope.pdfUrl = URL.createObjectURL(blob);
                            console.log('blob', blob);
                            console.log('pdfURL', $scope.pdfUrl);
                            //window.open($scope.pdfUrl);
                            cordova.InAppBrowser.open($scope.pdfUrl, '_blank', 'location=no');
                        })
                    };

                }
                else
                    if (ionic.Platform.isAndroid()) {
                        console.log("device is Android");
                        var htmlDATA = '<!DOCTYPE html><html><head> <title>Page Title</title></head><style> * { font-size: 14px; } .bg-img { background-repeat: no-repeat; background-size: cover; background-image: url(https://image.freepik.com/free-psd/abstract-background-design_1297-87.jpg); background-color: #ccc; height: 940px; } .logo { padding-top: 60%; text-align: center } .logo img { width: 70% } .content { text-align: center; padding: 20px 0 0 0; max-width: 1010px; margin: 0 auto; } .heading { color: white; font-family: Calibri, sans-serif; font-size: 22px; } .footer { background-color: #ffaf00; font-size: 10px; } .bg-div { height: 870px; } .bg-div3 { height: 870px; } .bg-div4 { height: 860px; } .div-rotate { /* Rotate div */ -ms-transform: rotate(270deg); /* IE 9 */ -webkit-transform: rotate(270deg); /* Safari 3-8 */ transform: rotate(270deg); padding-top: 45px; padding-right: 0px; height: 90%; }</style><body> <!-- First page --> <div> <div class="bg-img"> <div class="logo"> <img src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png"> </div> <div class="content"> <h1 class="heading">Delivering Energy Independence, one roof at a time </h1> <div style="padding-top:10px;"></div> <div style="width: 100%;color: #fff;"> <div style="width:30%;float: left;font-family: Calibri, sans-serif;"> <div> <div style="">Proposal Details</div> <div style="font-size: 11px;"> <div style="padding-top: 9px; padding-bottom: 9px;">Prepared on:' + details.preparedOn + '</div> <div style="padding-top: 9px; padding-bottom: 9px;">System Size: kWp ' + details.systemsize + '</div> </div> </div> </div> <div style="width:30%;float: left;font-family: Calibri, sans-serif;"> <div> <div>Customer Details</div> <div style="font-size: 11px;"> <div style="padding-top: 9px; padding-bottom: 9px;"> Name:' + details.name + ' </div> <div style="padding-top: 9px; padding-bottom: 9px;">Address:' + details.address + '</div> <div style="padding-top: 9px; padding-bottom: 9px;">City/State:' + details.city + '/' + details.state + '</div> </div> </div> </div> <div style="width:30%;float: left;font-family: Calibri, sans-serif;"> <div> <div>Proposed by</div> <div style="font-size: 11px;"> <div style="padding-top: 9px; padding-bottom: 9px;">Sales Consultant: ' + details.salesConsultant + '</div> <div style="padding-top: 9px; padding-bottom: 9px;">Contact:' + details.contact + ' </div> <div style="padding-top: 9px; padding-bottom: 9px;">Email: ' + details.email + '</div> </div> </div> </div> </div> <div style="clear:both;"></div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- End First page --> <div style="clear:bothclear;"></div> <!-- Second page start --> <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div> <div> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1> </div> </div> <div style="clear:bothclear;"></div> <hr> <div> <div class="bg-div"> <div style="width: 100%;color: #0C0C0C;height: 200px;"> <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <img style="width:95%;" src="https://wcs.smartdraw.com/pie-chart/img/slices-similar-in-value.jpg" style=""> </div> </div> <div style="width:40%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h1 style="font-size: 28px;">Cumilative Utility Cost *</h1> <h1 style="font-size: 20px;">5 years $ ' + details.cum5yrloss + '</h1> <h1 style="font-size: 24px;">10 years $ ' + details.cum10yrloss + '</h1> <h1 style="font-size: 28px;">30 years $ ' + details.cum30yrloss + '</h1> </div> </div> <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h1 style="font-size: 20px;">Average 30 years Utility Cost WITHOUT solar</h1> <h1 style="font-size: 28px;border: 1px solid;height: 61px;width: 164px;background: #f9b590;margin-left: 59px;">$' + details.avgutility + '</h1> </div> </div> </div> <DIV style="height:100px;"></DIV> <div style="width: 100%;color: #0C0C0C;height: 200px;text-align: center;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h2 style="border: 1px solid;background: #f9b590;padding-top: 18px;padding-bottom: 18px;">Solar System Average Energy cost over 30Years:<b>$' + details.avgEnergycost + '</b></h2> <h2 style="border: 1px solid;background: #f9b590;padding-top: 18px;padding-bottom: 18px;">Est. 30 Yr solar savings:<b>$' + details.estsaving + '</b></h2> <h2 style="font-size: 18px;">System Design</h2> <h4 style="font-size: 18px;">System Size(kWp):<b>' + details.systemsize + '</b></h4> <h4 style="font-size: 18px;">Numer of Panels:<b>' + details.noofpanels + '</b></h4> <h4 style="font-size: 18px;">Estimated Annual Production(kWh):<b>' + details.annualprod + '</b></h4> <h4 style="font-size: 18px;">Estimated Lifetime Production(kWh):<b>' + details.lifeprod + '</b></h4> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <img src="http://jcharts.sourceforge.net/usersGuide/0.7/images/lineCharts/basicChart.png" style="width: 98%;"></div> </div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- Second page end --> <!-- Third page start --> <div style="clear:bothclear;"></div> <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div> <div> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1> </div> </div> <div style="clear:bothclear;"></div> <hr> <div> <div class="bg-div"> <div style="height:100px;"></div> <div style="width: 100%;color: #0C0C0C;height: 200px;text-align: center;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <div style="width: 95%;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;"> <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div class="div-rotate"> <h1>30 year<br> investment <br> comparision </h1> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>Utility $</p> <p>Solar $</p> <b>SolarSaving vs Utility $</b> <span>(includes solar degradation)</span> </div> </div> <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>' + details.utility + '</p> <p>' + details.solar + '</p> <b>' + details.solarvsUtility + '</b> </div> </div> </div> <div style="width: 95%; margin-top: 28px;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;"> <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div class="div-rotate"> <h1>Utility vs <br> No/No Loan Period</h1> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>Av. Mth Util Bill Svgs $</p> <p>SREC Mo Value $</p> <b>SolarSaving/Mth. $</b> </div> </div> <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>' + details.avMthUtil + '</p> <p>' + details.srecMo + '</p> <b>' + details.solarMth + '</b> </div> </div> </div> <div style="width: 95%; margin-top: 28px;color: #0C0C0C;height: 161px;text-align: center;background: #f9b590;"> <div style="width:25%;height:100%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div class="div-rotate"> <h1>Utility vs Loan<br> -Long Term<br> Loan yr.2</h1> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>Solar Loan Mo. Pmt $</p> <p>Yr 2 Mth Util Bill Offset $</p> <p>Av. SREC Mo. Value $</p> <br> <b>Yr 2 Solar Svgs/Mth $</b> </div> </div> <div style="width:25%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <p>(' + details.solarPmt + ')</p> <p>' + details.billOffset + '</p> <p>' + details.avSREC + '</p> <br> <b>' + details.yrSolarSvgs + '</b> </div> </div> </div> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;"> <div> <h1>Financing Details</h1> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>Amount to pay to bank at No/No Loan End (Incentive Amount)</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> $' + details.noLoanEnd + ' </div> </div> </div> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0;margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>25 Year Loan</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> $' + details.loan25Yr + ' </div> </div> </div> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0; margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>Loan Interest Rate</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> ' + details.loanInterestRate + '% </div> </div> </div> <div style="width: 95%;color: #0C0C0C;text-align: center;background: #CBEAEB;display: inline-block; padding: 5px 0 5px 0; margin-bottom: 10px;"> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <b>30 Year Return on Investment</b> </div> </div> <div style="width:50%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> ' + details.returnonInvestment + '% </div> </div> </div> <p style="text-align:left;line-height: 39px;"> The calculations in this proposal are based in part on the information you have provided to your solar consultant. Please review the usage and rate assumptions in the proposal for accuracy. <br> The calculations in this proposal also assume that your electric consumption behavior in the future is consistent with your prior usage as depicted in this proposal.<br> Interest rates and amounts depicted in this proposal are subject to change based upon credit and financing decisions.</p> </div> </div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- Third page end --> <!-- Fourth start --> <div style="clear:bothclear;"></div> <div style="float:right;"><img style="float: right;width: 25%;" src="http://ww1.prweb.com/prfiles/2017/07/05/14482924/Suntuity%20Logo.png" style="float: right;"></div> <div> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Your solar savings are as follows: </h1> </div> </div> <div style="clear:bothclear;"></div> <hr> <div> <div class="bg-div3"> <div style="width: 100%;color: #0C0C0C;text-align: center;"> <div style="width:30%;float: left;font-family: Calibri, sans-serif;text-align: center;"> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">The process of going solar</h1> <img src="http://www.breezetree.com/articles/article_images/simple-flow-chart-example.png" style="width:90%"></div> </div> </div> <div style="width:70%;float: left;font-family: Calibri, sans-serif;text-align: left;"> <div> <h1 class="heading" style="color:orange;font-family: Calibri, sans-serif;">Customer Acknowledgement</h1> <p>I have reviewed and understand this proposal. I understand that the assumptions of this proposal are estimates that may change based upon my credit, financing decisions, final site survey and changes in utility rates.<br> I confirm my interest in this solar solution. I understand that my signature below does not constitue any obligation on my part to purchase the solar solution. <br> <br> <br> Signature: </p> <div style=" height: 177px;background:#f9b590;width: 442px;"> <hr style=" padding-top: 129px;"> </div> Date: </div> </div> </div> <div class="footer"> <table> <tr> <td>Proposal is valid for three days from: July16, 2018, &nbsp; | &nbsp;&nbsp; Proposal is valid for three days from: July16, 2018 </td> </tr> <tr> <td><span style="font-size: 10px;">MASSACHUSETTS:HIC 180758 44 School Street, #325, boston, MA, 02108|NEWYORK 1265 Sunrise Highway, Bagshore, NY 11706</span></td> </tr> </table> </div> </div> <!-- Fourth page end --></body></html>';

                        $scope.viewPdf = function () {
                            console.log("view of Android");
                            cordova.plugins.pdf.htmlToPDF({
                                data: htmlDATA,
                                type: 'share',
                                //Open a context menu and ask the user what to do next (print, mail, etc..).
                                fileName: 'v8-tutorial.pdf'
                            }, function (base64) {
                                console.log('success', base64)

                                var binaryString = window.atob(base64);
                                var binaryLen = binaryString.length;
                                var bytes = new Uint8Array(binaryLen);
                                for (var i = 0; i < binaryLen; i++) {
                                    var ascii = binaryString.charCodeAt(i);
                                    bytes[i] = ascii;
                                }
                                var blob = new Blob([bytes], { type: 'application/pdf' });
                                $scope.pdfUrl = URL.createObjectURL(blob);
                                console.log('blob', blob);
                                console.log('pdfURL', $scope.pdfUrl);
                                //window.open($scope.pdfUrl);
                                cordova.InAppBrowser.open($scope.pdfUrl, '_blank', 'location=no');
                            })
                        };
                        $scope.sharePdf = function () {
                            console.log("share of Android");
                            cordova.plugins.pdf.htmlToPDF({
                                data: htmlDATA,
                                type: 'share',          //Open a context menu and ask the user what to do next (print, mail, etc..).

                                fileName: 'v8-tutorial.pdf'
                            }, function (base64) {
                                console.log('success', base64)

                                var binaryString = window.atob(base64);
                                var binaryLen = binaryString.length;
                                var bytes = new Uint8Array(binaryLen);
                                for (var i = 0; i < binaryLen; i++) {
                                    var ascii = binaryString.charCodeAt(i);
                                    bytes[i] = ascii;
                                }
                                var blob = new Blob([bytes], { type: 'application/pdf' });
                                $scope.pdfUrl = URL.createObjectURL(blob);
                                console.log('blob', blob);
                                console.log('pdfURL', $scope.pdfUrl);
                                //window.open($scope.pdfUrl);
                                cordova.InAppBrowser.open($scope.pdfUrl, '_blank', 'location=no');
                            })
                        };
                        $scope.docusignthePDF = function () {
                            cordova.plugins.pdf.htmlToPDF({
                                data: htmlDATA,
                                type: 'base64',
                                fileName: 'v8-tutorial.pdf'
                            }, function (base64) {
                                console.log('success', base64)
                                var url = "https://demo.docusign.net/restApi/v2/accounts/d0364b2e-61e2-42d6-a1de-32906a05b4fd/envelopes"
                                var requestData = {
                                    "status": "sent",
                                    "emailSubject": "Request a signature via email example",
                                    "documents": [{
                                        "documentId": "1",
                                        "name": "contract.pdf",
                                        "documentBase64": base64
                                    }],
                                    "recipients": {
                                        "signers": [{
                                            "name": "Nagaraju",
                                            "email": "srivalli.friendly@gmail.com",
                                            "recipientId": "1",
                                            "tabs": {
                                                "signHereTabs": [{
                                                    "xPosition": "250",
                                                    "yPosition": "200",
                                                    "documentId": "1",
                                                    "pageNumber": "4"
                                                }]
                                            }
                                        }]
                                    }
                                }
                                $http.post(url, requestData, {
                                    headers: { 'Content-Type': 'application/json', 'X-DocuSign-Authentication': '{ "Username":"nagaraju6911@gmail.com", "Password":"nagesh@123", "IntegratorKey":"2c3d1b2c-6a12-40f1-96bd-1a51b2ac01bf" }' },
                                
                                }).success(function (responseData) {
                                    //do stuff with response
                                    console.log(responseData)
                                });
                            })
                            console.log("docusignthePDF");
                        }

                    }

            });



        }])
