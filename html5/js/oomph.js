function startoomph() {
    if (!window.oomph_semaphore)
        jQuery(function() {

            //make sure this script hasn't been already loaded. this could happen if
            //someone has customized the script and then it is loaded by the IE add-in
            var oomph_semaphore = true;
            window.oomph_semaphore = oomph_semaphore;

            var oomph;
            oomph = jQuery.noConflict(true);

            //*****************************************************************//
            //GLOBAL VARIABLES
            //*****************************************************************//
            var hCardCollection = oomph('.vcard');
            var hCalendarCollection = oomph('.vevent');
            var hAudioCollection = oomph('.hmedia');
            var microformatTotal = hCardCollection.length + hCalendarCollection.length + hAudioCollection.length; 	//no point in continuing if there are no microformats
            if (microformatTotal == 0)
                return;
            var addresses = [];
            var geoinfos = [];
            //VE needs typed array of VELatLong to aggregate view
            var geoinfos2 = [];
            var addressCounter = 0;
            var animationSpeed = 300;
            var currentHCard = 1;
            var currentHCalendar = 1;
            var isSpanClicked = false;
            var width = "";
            var currentHAudio = 1;
            var mainhAudioContainer = oomph('<div class="iwmf_box" ></div>');
            var hAudioHead = oomph('<div class="iwmf_typeHead">Media</div>');
            var hAudios = oomph('<ul id="iwmf_hAudios" ></ul>');

            var pinHTML = "<div style='position:relative;'><div id='{0}'class='pinShadowStyle'>&nbsp;</div><div id='{1}' class='pinStyle'>1</div></div>";

            //main UI containers
            var iwmf = oomph('<span id="iwmf" ></span>');

            //gleam and toolbar containers
            var gleam = oomph('<div id="iwmf_gleam"  title="Oomph: A Microformat Overlay"></div>');
            var mainNavContainer = oomph('<div id="iwmf_mainNavContainer" ></div>');

            //toolbar buttons
            var mix_info = oomph('<div id="iwmf_info" title="Oomph from MIX Online" ><span class="iwmf_green">Oomph</span>: A Microformats Toolkit, brought to you by <a href="http://visitmix.com" target="_blank">MIX Online</a></div>');
            // var listViewButton = oomph('<div id="iwmf_listViewButton" title="See all Microformats on this page" ></div>');
            // var mapViewButton = oomph('<div id="iwmf_mapViewButton" title="Map all Microformats on this page"></div>');
            // var calViewButton = oomph('<div id="iwmf_calViewButton"></div>');
            var closeButton = oomph('<div id="iwmf_closeButton"></div>');

            //hCard and hCalendar containers
            var mainContainer = oomph('<div id="iwmf_mainContainer" ></div>');
            var clear = oomph('<div id="clear"></div>');
            var mapFrame = oomph('<div id="iwmf_mapFrame" ></div>');
            var mainhCardContainer = oomph('<div class="iwmf_box"></div>');
            var mainEventContainer = oomph('<div class="iwmf_box"></div>');
            var eventsHead = oomph('<div class="iwmf_typeHead">Events</div>');
            var contactsHead = oomph('<div class="iwmf_typeHead" >Contacts</div>');
            var vEvents = oomph('<ul id="iwmf_vEvents" ></ul>');
            var vCards = oomph('<ul id="iwmf_vCards" ></ul>');
            var mainMap = null;

            var shadow = oomph('<div id="shadow"></div>');
            shadow.hide();
            //*****************************************************************//
            //INIT BEHAVIOR
            //*****************************************************************//
            insertCSS();
            wirePaging();
            wireEvents();
            //here we use jQuery's getScript to get the VE script
            //we provide a callback to our final init call displayUI after the script is loaded
            oomph.getScript("http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.2", displayUI);
            //*****************************************************************//
            //FUNCTIONS
            //*****************************************************************//


            //insert CSS
            function insertCSS() {
                var head = document.getElementsByTagName('head')[0];
                if (!head)
                    document.getElementsByTagName('html')[0];
                var css1 = document.createElement('link');
                css1.href = 'http://visitmix.com/labs/oomph/2.0/client/oomph.css';
                //css1.href = 'http://localhost/oomph/oomph.css';
                css1.type = 'text/css';
                css1.rel = 'stylesheet';
                head.appendChild(css1);

            }

            function wirePaging() {
                //hcalendar ui
                //paging
                if (hCalendarCollection.length > 1) {

                    var eventNext = oomph('<div class="iwmf_Next"><a href="#" >Next ></a></div>').bind('click', function(event) {
                        currentHCalendar = currentHCalendar + 1;
                        if (currentHCalendar <= oomph('.iwmf_vEventContainer').size()) {
                            oomph('.iwmf_vEventContainer').hide(animationSpeed);
                            var current = oomph('.iwmf_vEventContainer')[currentHCalendar - 1];
                            oomph(current).show(animationSpeed);
                        }
                        else
                            currentHCalendar = currentHCalendar - 1;
                        oomph('#iwmf_hCalendarNum').text(currentHCalendar + ' of ' + hCalendarCollection.length);

                    });

                    var eventPrev = oomph('<div class="iwmf_Prev"><a href="#" >< Prev</a></div>').bind('click', function(event) {
                        currentHCalendar = currentHCalendar - 1;
                        if (currentHCalendar >= 1) {
                            oomph('.iwmf_vEventContainer').hide(animationSpeed);
                            var current = oomph('.iwmf_vEventContainer')[currentHCalendar - 1];
                            oomph(current).show(animationSpeed);
                        }
                        else
                            currentHCalendar = 1;
                        oomph('#iwmf_hCalendarNum').text(currentHCalendar + ' of ' + hCalendarCollection.length);

                    });

                    oomph(mainEventContainer).append(eventNext);
                    oomph(mainEventContainer).append('<div id="iwmf_hCalendarNum" class="iwmf_Prev">' + currentHCalendar + ' of ' + hCalendarCollection.length + '</div>');
                    oomph(mainEventContainer).append(eventPrev);

                }
                //hcard ui			 		    
                //paging
                if (hCardCollection.length > 1) {
                    var contactNext = oomph('<div class="iwmf_Next"><a href="#" >Next&nbsp;></a>').bind('click', function(event) {
                        currentHCard = currentHCard + 1;
                        if (currentHCard <= oomph('.iwmf_hCardContainer').size()) {
                            oomph('.iwmf_hCardContainer').hide(animationSpeed);
                            var current = oomph('.iwmf_hCardContainer')[currentHCard - 1];
                            oomph(current).show(animationSpeed);
                        }
                        else
                            currentHCard = currentHCard - 1;
                        oomph('#iwmf_hCardNum').text(currentHCard + ' of ' + hCardCollection.length);
                    });

                    var contactPrev = oomph('<div class="iwmf_Prev"><a href="#"><&nbsp;Prev</a>').bind('click', function(event) {
                        currentHCard = currentHCard - 1;
                        if (currentHCard >= 1) {
                            oomph('.iwmf_hCardContainer').hide(animationSpeed);
                            var current = oomph('.iwmf_hCardContainer')[currentHCard - 1];
                            oomph(current).show(animationSpeed);
                        }
                        else
                            currentHCard = 1;
                        oomph('#iwmf_hCardNum').text(currentHCard + ' of ' + hCardCollection.length);

                    });
                    oomph(mainhCardContainer).append(contactNext);
                    oomph(mainhCardContainer).append('<div id="iwmf_hCardNum" class="iwmf_Prev">' + currentHCard + ' of ' + hCardCollection.length + '</div>');
                    oomph(mainhCardContainer).append(contactPrev);
                }


                if (hAudioCollection.length > 1) {
                    var audioNext = oomph('<div class="iwmf_Next"><a href="#" >Next ></a></div>').bind('click', function(event) {
                        currentHAudio = currentHAudio + 1;
                        if (currentHAudio <= oomph('.iwmf_hAudioContainer').size()) {
                            oomph('.iwmf_hAudioContainer').hide(animationSpeed);
                            var current = oomph('.iwmf_hAudioContainer')[currentHAudio - 1];
                            oomph(current).show(animationSpeed);
                        }
                        else
                            currentHAudio = currentHAudio - 1;
                        oomph('#iwmf_hMediaNum').text(currentHAudio + ' of ' + hAudioCollection.length);
                    });

                    var audioPrev = oomph('<div class="iwmf_Prev"><a href="#">< Prev</a></div>').bind('click', function(event) {
                        currentHAudio = currentHAudio - 1;
                        if (currentHAudio >= 1) {
                            oomph('.iwmf_hAudioContainer').hide(animationSpeed);
                            var current = oomph('.iwmf_hAudioContainer')[currentHAudio - 1];
                            oomph(current).show(animationSpeed);
                        }
                        else
                            currentHAudio = 1;
                        oomph('#iwmf_hMediaNum').text(currentHAudio + ' of ' + hAudioCollection.length);
                    });
                    oomph(mainhAudioContainer).append(audioNext);
                    oomph(mainhAudioContainer).append('<div id="iwmf_hMediaNum" class="iwmf_Prev">' + currentHAudio + ' of ' + hAudioCollection.length + '</div>');
                    oomph(mainhAudioContainer).append(audioPrev);
                }




            }

            //attach events to main ui objects
            function wireEvents() {
                //gleam click
                oomph(gleam).click(
	              function() {
	                  //alter span width on the fly; if we don't hyperlinks covered by the span
	                  //don't work in firefox
	                  if (isSpanClicked) {
	                      oomph(mainNavContainer).hide(animationSpeed);
	                      oomph(mainContainer).hide(animationSpeed);
	                      oomph('#iwmf').css({ 'width': '32px' });
	                      isSpanClicked = false;
	                      shadow.hide();
	                  }
	                  else {
	                      oomph('#iwmf').css({ 'width': width });
	                      oomph(mainContainer).show(animationSpeed);
	                      oomph(mainNavContainer).show(animationSpeed);
	                      isSpanClicked = true;
	                      shadow.show();
	                  }
	              }
	            );

                oomph(closeButton).bind("click",
 	          		function() {
 	          		    oomph(mainContainer).hide(animationSpeed);
 	          		    oomph(mainNavContainer).hide(animationSpeed);
 	          		    oomph('#iwmf').css({ 'width': '32px' });
 	          		    shadow.hide();
 	          		    isSpanClicked = false;

 	          		});

            }



            function buildMap() {

                //deal with firefox slowness in loading script
                try {
                    mainMap = new VEMap('iwmf_mapFrame');
                    mainMap.LoadMap();
                }
                catch (err) {
                    setTimeout(buildMap, 1000);
                    return;
                }
                //seems the only way to force the size we want for the map
                mainMap.Resize(200, 200);

                //firefox hack because it always places the map over about 350 px
                if (oomph.browser.mozilla)
                    mainMap.Pan(-350, 0);

                //geocode any addresses	using recursion since the calls to VE are asynch
                if (addresses.length > 0)
                    geoCode(addresses[0]);
                //handle any geoinfos we got
                if (geoinfos.length > 0) {
                    for (var i = 0; i < geoinfos.length; i++) {

                        var myShape = new VEShape(VEShapeType.Pushpin, new VELatLong(geoinfos[i].lat, geoinfos[i].lon));
                        myShape.SetTitle(geoinfos[i].name);
                        mainMap.AddShape(myShape);
                        geoinfos2.push(new VELatLong(geoinfos[i].lat, geoinfos[i].lon));
                    
                        var currentMarkerID = myShape.GetID();
                        var currentPinHTML = pinHTML.replace('{0}', currentMarkerID + '_iconShadow');
                        var currentPinHTML = currentPinHTML.replace('{1}', currentMarkerID + '_icon');
                       // myShape.SetCustomIcon(currentPinHTML);


                   
                    }
                    //center and zoom if only one geoinfo
                    mainMap.SetMapView(geoinfos2);


                }

            }
            function geoCode(address) {
                //because we might be mapping multiple locations, we aren't going to zoom in 
                //unless there is only one location microformatTotal
                //hmm, VE doesn't seem to be zooming even if there is only one

                var zoom = true;
                if (addresses.length > 1 || geoinfos.length > 0) {
                    zoom = false;
                }
                mainMap.Find(null,
                  address.location,
                  null,
                  null,
                  null,
                  null,
                  true,
                  true,
                  false, //only return one geocode
                  zoom,
                  GetCoordinates); //provide the GetCoordinates callback for the response
            }
            //virutal earth function for geocoding and pushpins
            function GetCoordinates(layer, resultsArray, places, hasMore, veErrorMessage) {
                if (places == null)
                    return;
                geoinfos.push(places[0].LatLong);
                var myShape = new VEShape(VEShapeType.Pushpin, places[0].LatLong);
                geoinfos2.push(new VEShape(VEShapeType.Pushpin, places[0].LatLong))
                myShape.SetTitle(addresses[addressCounter].name);
                mainMap.AddShape(myShape);
                
                
                var currentMarkerID = myShape.GetID();
                var currentPinHTML = pinHTML.replace('{0}', currentMarkerID + '_iconShadow');
                var currentPinHTML = currentPinHTML.replace('{1}', currentMarkerID + '_icon');
                //myShape.SetCustomIcon(currentPinHTML);

                
                if (geoinfos.length == 1)
                    mainMap.SetCenterAndZoom(places[0].LatLong, 13);
                //we can only do another geocode after the first one completes, thus the recursion
                addressCounter++;

                if (addressCounter < addresses.length)
                    geoCode(addresses[addressCounter]);
                //if we've got them all, reset map view
                if (addressCounter == addresses.length && addresses.length > 1)
                    mainMap.SetMapView(geoinfos2);

            }


            function buildWindowsLiveCalendarURL(summary, dtstart, dtend, location, description) {
                if (!dtstart)
                    return;
                //weird windows live doesn't like the T
                dtstart = dtstart.replace(/T/, ' ');
                dtstart = dtstart + 'Z';
                if (dtend) {
                    dtend = dtend.replace(/T/, ' ');
                    dtend = dtend + 'Z';
                }
                var url = "http://spaces.live.com/api.aspx?wx_action=createEvent";
                url = url + "&Wxp_name=" + summary + "&Wxp_startDateTime=" + dtstart +
        		"&Wxp_endDateTime=" + dtend + " &Wxp_location=" + location + "&Wxp_description=" +
        		description;

                return url;
            }

            function buildGoogleCalendarURL(summary, dtstart, dtend, location, description) {

                var url = "http://www.google.com/calendar/event?action=TEMPLATE";
                var date = dtstart;
                //google insists on an end date
                if (dtend)
                    date = date + "/" + dtend;
                else
                    date = date + "/" + dtstart;

                url = url + "&text=" + summary + "&dates=" + date + "&location=" + location + "&details=" + description;
                return url;

            }


            function buildYahooCalendarURL(summary, dtstart, dtend, location, description, uri) {

                var url = "http://calendar.yahoo.com/?v=60&type=0";
                url = url + "&title=" + summary + "&st=" + dtstart +
        		"&rend" + dtend + "&in_loc=" + location +
        		"&url=" + uri + "&DESC=" + description;
                return url;
            }


            function build30BoxesCalendarURL(summary, dtstart, dtend, location, description, uri) {

                var url = "http://30boxes.com/add.php?e=" + summary + " " + dtstart +
        	" " + description + " " + location;
                return url;
            }


            function buildiCalendarURL(dtstart_iso_nopunc, dtend_iso_nopunc, location, summary, description) {

                var url = "http://visitmix.com/labs/oomph/1.0/Server/icalendar.ashx?" +
			"dtstart=" + dtstart_iso_nopunc + "&dtend=" + dtend_iso_nopunc + "&location=" + location + "&summary=" + summary + "&description=" + description;
                return url;

            }


            function buildvCardURL(fn, additionalname, familyname, givenname, nameprefix, namesuffix, nickname, organization, role, title, email, note,
         streetaddress, region, locality, postalcode, countryname, photo, workphone, workfax, homephone, cellphone, pager, url, bday, latitude, longitude, category, rev, uid, mailer) {

                var url = "http://visitmix.com/labs/oomph/1.0/Server/vcard.ashx?fn=" + fn +
        	"&AdditionalName=" + additionalname + "&FamilyName=" + familyname +
        	"&GivenName=" + givenname + "&NamePrefix=" + nameprefix + "&namesuffix" + namesuffix +
        	"&NickName=" + nickname + "&Organization=" + organization + "&Role=" + role + "&Title=" + title +
        	"&WorkEmail=" + email + "&note=" + note + "&adrWork=true&wStreet=" + streetaddress +
        	"&wCity=" + locality + "&wRegion=" + region + "&wPostalCode=" + postalcode +
        	"&wCountry=" + countryname + "&photo=" + photo + "&WorkPhone=" + workphone +
        	"&WorkFax=" + workfax + "&HomePhone=" + homephone + "&CellPhone=" + cellphone +
        	"&Pager=" + pager + "&WorkWebsite=" + url + "&bday=" + bday + "&latitude=" + latitude + "&longitude=" + longitude +
        	"&category=" + category + "&rev=" + rev + "&uid=" + uid + "&mailer=" + mailer;
                return url;
            }

            function buildYahooContactURL(fn, company, email, uri, address) {

                var url = "http://address.yahoo.com/?A=C&";
                url = url + "fn=" + fn + "&co=" + company +
        		"&pu=" + uri + "&e=" + email;
                return url;
            }

            //geo object
            function geo(latitude, longitude) {
                this.latitude = latitude;
                this.longitude = longitude;
            }

            //Date Helper function
            function iso8601FromDate(date, punctuation) {
                var string = date.getFullYear().toString();
                if (punctuation) {
                    string += "-";
                }
                string += (date.getMonth() + 1).toString().replace(/\b(\d)\b/g, '0oomph1');
                if (punctuation) {
                    string += "-";
                }
                string += date.getDate().toString().replace(/\b(\d)\b/g, '0oomph1');
                if (date.time) {
                    string += "T";
                    string += date.getHours().toString().replace(/\b(\d)\b/g, '0oomph1');
                    if (punctuation) {
                        string += ":";
                    }
                    string += date.getMinutes().toString().replace(/\b(\d)\b/g, '0oomph1');
                    if (punctuation) {
                        string += ":";
                    }
                    string += date.getSeconds().toString().replace(/\b(\d)\b/g, '0oomph1');
                    if (date.getMilliseconds() > 0) {
                        if (punctuation) {
                            string += ".";
                        }
                        string += date.getMilliseconds().toString();
                    }
                }
                return string;
            }


            function normalizeISO8601(string, punctuation) {
                var dateArray = string.match(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:([-+Z])(?:(\d\d)(?::?(\d\d))?)?)?)?)?)?/);

                var dateString;
                var tzOffset = 0;
                if (!dateArray) {
                    return;
                }
                if (dateArray[1]) {
                    dateString = dateArray[1];
                    if (dateArray[2]) {
                        if (punctuation) {
                            dateString += "-";
                        }

                        dateString += dateArray[2];
                        if (dateArray[3]) {
                            if (punctuation) {
                                dateString += "-";
                            }
                            dateString += dateArray[3];
                            if (dateArray[4]) {
                                dateString += "T" + dateArray[4];
                                if (dateArray[5]) {
                                    if (punctuation) {
                                        dateString += ":";
                                    }
                                    dateString += dateArray[5];
                                } else {
                                    if (punctuation) {
                                        dateString += ":";
                                    }

                                    dateString += "00";
                                }
                                if (dateArray[6]) {

                                    if (punctuation) {
                                        dateString += ":";
                                    }

                                    dateString += dateArray[6];
                                } else {
                                    if (punctuation) {
                                        dateString += ":";
                                    }

                                    dateString += "00";
                                }
                                if (dateArray[7]) {
                                    if (punctuation) {
                                        dateString += ".";
                                    }


                                    dateString += dateArray[7];
                                }
                                if (dateArray[8]) {
                                    dateString += dateArray[8];
                                    if ((dateArray[8] == "+") || (dateArray[8] == "-")) {
                                        if (dateArray[9]) {
                                            dateString += dateArray[9];
                                            if (dateArray[10]) {
                                                dateString += dateArray[10];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return dateString;
            }


            function dateFromISO8601(string) {
                var dateArray = string.match(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:([-+Z])(?:(\d\d)(?::?(\d\d))?)?)?)?)?)?/);

                var date = new Date(dateArray[1], 0, 1);
                date.time = false;

                if (dateArray[2]) {
                    date.setMonth(dateArray[2] - 1);
                }
                if (dateArray[3]) {
                    date.setDate(dateArray[3]);
                }
                if (dateArray[4]) {
                    date.setHours(dateArray[4]);
                    date.time = true;
                    if (dateArray[5]) {
                        date.setMinutes(dateArray[5]);
                        if (dateArray[6]) {
                            date.setSeconds(dateArray[6]);
                            if (dateArray[7]) {
                                date.setMilliseconds(Number("0." + dateArray[7]) * 1000);
                            }
                        }
                    }
                }
                if (dateArray[8]) {
                    if (dateArray[8] == "-") {
                        if (dateArray[9] && dateArray[10]) {
                            date.setHours(date.getHours() + parseInt(dateArray[9], 10));
                            date.setMinutes(date.getMinutes() + parseInt(dateArray[10], 10));
                        }
                    } else if (dateArray[8] == "+") {
                        if (dateArray[9] && dateArray[10]) {
                            date.setHours(date.getHours() - parseInt(dateArray[9], 10));
                            date.setMinutes(date.getMinutes() - parseInt(dateArray[10], 10));
                        }
                    }
                    /* at this point we have the time in gmt */
                    /* convert to local if we had a Z - or + */
                    if (dateArray[8]) {
                        var tzOffset = date.getTimezoneOffset();
                        if (tzOffset < 0) {
                            date.setMinutes(date.getMinutes() + tzOffset);
                        } else if (tzOffset > 0) {
                            date.setMinutes(date.getMinutes() - tzOffset);
                        }
                    }
                }
                return date;
            }

            //fix relative pathed URLs
            //attribution to http://www.sitepoint.com/blogs/2007/08/10/dealing-with-unqualified-href-values/
            function qualifyHREF(href) {
                //get the current document location object 
                var loc = document.location;

                //build a base URI from the protocol plus host (which includes port if applicable) 
                var uri = loc.protocol + '//' + loc.host;

                //if the input path is relative-from-here 
                //just delete the ./ token to make it relative 
                if (/^(\.\/)([^\/]?)/.test(href)) {
                    href = href.replace(/^(\.\/)([^\/]?)/, 'oomph2');
                }

                //if the input href is already qualified, copy it unchanged 
                if (/^([a-z]+)\:\/\//.test(href)) {
                    uri = href;
                }

                //or if the input href begins with two leading slashes, then we just append
                //the protocol
                else if (href.substr(0, 2) == '//') {
                    uri = loc.protocol + href;
                }
                //or if the input href begins with a leading slash, then it's base relative 
                //so just add the input href to the base URI 
                else if (href.substr(0, 1) == '/') {
                    uri += href;
                }



                //or if it's an up-reference we need to compute the path 
                else if (/^((\.\.\/)+)([^\/].*oomph)/.test(href)) {
                    //get the last part of the path, minus up-references 
                    var lastpath = href.match(/^((\.\.\/)+)([^\/].*oomph)/);
                    lastpath = lastpath[lastpath.length - 1];

                    //count the number of up-references 
                    var references = href.split('../').length - 1;

                    //get the path parts and delete the last one (this page or directory) 
                    var parts = loc.pathname.split('/');
                    parts = parts.splice(0, parts.length - 1);

                    //for each of the up-references, delete the last part of the path 
                    for (var i = 0; i < references; i++) {
                        parts = parts.splice(0, parts.length - 1);
                    }

                    //now rebuild the path 
                    var path = '';
                    for (i = 0; i < parts.length; i++) {
                        if (parts[i] != '') {
                            path += '/' + parts[i];
                        }
                    }
                    path += '/';

                    //and add the last part of the path 
                    path += lastpath;

                    //then add the path and input href to the base URI 
                    uri += path;
                }

                //otherwise it's a relative path, 
                else {
                    //calculate the path to this directory 
                    path = '';
                    parts = loc.pathname.split('/');
                    parts = parts.splice(0, parts.length - 1);
                    for (var i = 0; i < parts.length; i++) {
                        if (parts[i] != '') {
                            path += '/' + parts[i];
                        }
                    }
                    path += '/';

                    //then add the path and input href to the base URI 
                    uri += path + href;
                }

                //return the final uri 
                return uri;
            }
            //generate the UI
            function displayUI() {


                findAndParseHCards();
                findAndParseHCalendars();
                findAndParseHAudio();
                buildMap();


                //containers
                oomph("body").append(iwmf);
                oomph(iwmf).append(gleam);
                oomph(iwmf).append(mainNavContainer);
                oomph(iwmf).append(mainContainer);
                oomph(iwmf).append(shadow);

                //toolbar
                oomph(mainNavContainer).append(mix_info);
                oomph(mainNavContainer).append(closeButton);


                //contacts
                if (hCardCollection.length > 0) {
                    oomph(mainContainer).append(mainhCardContainer);
                    oomph(mainhCardContainer).append(contactsHead);
                    oomph(mainhCardContainer).append(vCards);
                }
                //events
                if (hCalendarCollection.length > 0) {
                    oomph(mainContainer).append(mainEventContainer);
                    oomph(mainEventContainer).append(eventsHead);
                    oomph(mainEventContainer).append(vEvents);
                }

                //haudio
                if (hAudioCollection.length > 0) {
                    oomph(mainContainer).append(mainhAudioContainer);
                    oomph(mainhAudioContainer).append(hAudioHead);
                    oomph(mainhAudioContainer).append(hAudios);
                }
                //new map container
                if (geoinfos.length > 0 || addresses.length > 0)
                    oomph(mainContainer).append(mapFrame);

                //clear
                oomph(mainContainer).append(clear);


                //mod the css if only one Microformat
                var colColumnCount = 0;
                if (hCardCollection.length > 0)
                    colColumnCount = colColumnCount + 1;

                if (hCalendarCollection.length > 0)
                    colColumnCount = colColumnCount + 1;

                if (hAudioCollection.length > 0)
                    colColumnCount = colColumnCount + 1;

                if (colColumnCount == 1 && geoinfos.length == 0 && addresses.length == 0) {
                    //oomph('<li class="iwmf_hCardContainer"></li>').css({ 'display': 'NONE' });
                    iwmf.css({ 'width': '460px' });
                    width = "460px";
                    oomph('.iwmf_box').css({ 'width': '400px', 'border-right': '0px' });
                    oomph('.iwmf_mainNavContainer').css({ 'width': '400px', 'border-right': '0px' });
                    oomph('.iwmf_hmediaphoto').css({ 'max-width': '400px' });
                }
                // if we have 1 mf and 1 map -- 550px px
                if (colColumnCount == 1 && (geoinfos.length > 0 || addresses.length > 0)) {
                    iwmf.css({ 'width': '550px' });
                    width = "550px";
                }

                // we have 2 mf and no map -- 550px px
                if (colColumnCount == 2 && geoinfos.length == 0 && addresses.length == 0) {
                    iwmf.css({ 'width': '550px' });
                    width = "550px";
                }
                // we have 2 mf and a map -- 830px px
                if (colColumnCount == 2 && (geoinfos.length > 0 || addresses.length > 0)) {
                    iwmf.css({ 'width': '830px' });
                    width = "830px";
                }

                //we have 3 and no map -- 830px px
                if (colColumnCount == 3 && geoinfos.length == 0 && addresses.length == 0) {
                    //oomph('<li class="iwmf_hCardContainer"></li>').css({ 'display': 'NONE' });
                    iwmf.css({ 'width': '830px' });
                    width = "830px";
                }

                //we have 3 and a map -- 1150px px
                if (colColumnCount == 3 && (geoinfos.length > 0 || addresses.length > 0)) {
                    //oomph('<li class="iwmf_hCardContainer"></li>').css({ 'display': 'NONE' });
                    iwmf.css({ 'width': '1150px' });
                    width = "1150px";
                }


            }

            function findAndParseHAudio() {
                var hAudioCount = 0;
                oomph(hAudioCollection).each(function() {
                    var hAudio = oomph(this);
                    var enclosure = hAudio.find('a[rel=enclosure]').attr('href');
                    var photo = hAudio.find('.photo').attr('src');
                    //sometimes photo is wrapped in a span
                    //need more generic solution to this problem
                    if (photo == null)
                        photo = hAudio.find('.photo>img').attr('src');
                    var contributor = hAudio.find('.contributor').text();
                    var title = hAudio.find('.fn').text();
                    if (hAudioCount == 0)
                        var hAudioContainer = oomph('<li class="iwmf_hAudioContainer"></li>').show();
                    else
                        var hAudioContainer = oomph('<li class="iwmf_hAudioContainer"></li>').css({ 'display': 'NONE' });
                    var hAudioUI = oomph('<div class="iwmf_hAudio" ></div>');
                    oomph(hAudioUI).append('<div class="iwmf_fn">' + title + '</div>');
                    oomph(hAudioUI).append('<div>' + contributor + '</div>');
                    if (enclosure) {
                        var height = 150;
                        var type = enclosure.substr(enclosure.length - 3, 3).toLowerCase();
                        if (type == "mp3" || type == "wma") {
                            height = 28;
                        }
                        oomph(hAudioUI).append('<object data="data:application/x-silverlight," type="application/x-silverlight-2" width="200" height="' + height + '"><param name="source" value="http://visitmix.com/labs/oomph/2.0/Inplay.xap" /><param name="enableHtmlAccess" value="true"   /> <param name="background" value="#00000000" /><param name="windowless" value="true" /><param name="initParams" value="id=Video,source=' + qualifyHREF(enclosure) + ',background=50AAAAAA,volume=0.5,play=false" /><a href="http://go.microsoft.com/fwlink/?LinkID=124807"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" /></a></object>  ');
                    }
                    if (photo)
                        oomph(hAudioUI).append('<img class="iwmf_hmediaphoto" src="' + photo + '"/>');

                    oomph(hAudioContainer).append(hAudioUI);
                    oomph(hAudios).append(hAudioContainer);


                    hAudioCount++;


                });

            }


            function findAndParseHCards() {
                var hCardCount = 0;
                if (oomph(hCardCollection).length == 0) {
                    return;
                }
                oomph(hCardCollection).each(function() {
                    var hCard = oomph(this);
                    var fn = hCard.find('.fn').text();
                    var n = hCard.find('.n').text();
                    var additionalname = hCard.find('.additional-name').text();
                    var familyname = hCard.find('.family-name').text();
                    var givenname = hCard.find('.given-name').text();
                    var nameprefix = hCard.find('.honorific-prefix').text();
                    var namesuffix = hCard.find('.honorific-suffix').text();
                    var org = hCard.find('.org').text();
                    var organization = hCard.find('.organization-name').text();
                    var organizationunit = hCard.find('.organization-unit').text();
                    var nickname = hCard.find('.nickname').text();

                    var role = hCard.find('.role').text();
                    var title = hCard.find('.title').text();
                    var email = hCard.find('.email').text();
                    email.replace("mailto:", "");
                    var note = hCard.find('.note').text();

                    //we only deal with the first address provided
                    //TODO: Support multiple addresses
                    var streetaddress = hCard.find('.street-address:first').text();
                    var extendedaddress = hCard.find('.extended-address:first').text();
                    var postofficebox = hCard.find('.post-office-box:first').text();
                    var locality = hCard.find('.locality:first').text();
                    var region = hCard.find('.region:first').text();
                    var postalcode = hCard.find('.postal-code:first').text();
                    var countryname = hCard.find('.country-name:first').text();

                    var photo = hCard.find('.photo').attr('src');
                    //sometimes photo is wrapped in a span
                    //need more generic solution to this problem
                    if (photo == null)
                        photo = hCard.find('.photo>img').attr('src');

                    var workphone = phoneHelper("work", hCard);
                    var workfax = phoneHelper("fax", hCard); // = hCard.find('.tel>.type:contains("fax")').text();
                    var homephone = phoneHelper("home", hCard); // = hCard.find('.tel>.type:contains("home")').text();
                    var cellphone = phoneHelper("cell", hCard); // = hCard.find('.tel>.type:contains("cell")').text();
                    var pager = phoneHelper("pager", hCard); // = hCard.find('.tel>.type:contains("pager")').text();

                    //same span problem; need more generic solution
                    var url = hCard.find('.url').attr('href');
                    if (url == null)
                        url = hCard.find('.url>a').attr('href');
                    if (url)
                        url = qualifyHREF(url);
                    var latitude;
                    var longitude;

                    if (hCard.find('.geo').length > 0) {
                        latitude = hCard.find('.latitude').attr('title');
                        longitude = hCard.find('.longitude').attr('title');
                        if (!latitude) {
                            latitude = hCard.find('.latitude').text();
                            longitude = hCard.find('.longitude').text();

                        }

                    }
                    var bday = dateHelper("bday", hCard);
                    //todo:implement multiple categories
                    var category = hCard.find('.category:first').text();
                    var rev = hCard.find('.rev').text();
                    var uid = hCard.find('.uid').text();
                    var mailer = hCard.find('.mailer').text();
                    //ui elements
                    //only display first vCard 				
                    if (hCardCount == 0)
                        var vCardContainer = oomph('<li class="iwmf_hCardContainer"></li>').show();
                    else
                    //the call to hide() doesn't work in webkit (chrome/safari)
                        var vCardContainer = oomph('<li class="iwmf_hCardContainer"></li>').css({ 'display': 'NONE' });

                    //we don't display every hCard field for sake of space, but we export them all
                    var vcard = oomph('<div class="iwmf_vCard" ></div>');
                    if (!n)
                        oomph(vcard).append('<div class="iwmf_fn">' + fn + '</div>');
                    else
                        oomph(vcard).append('<div class="iwmf_fn">' + n + '</div>');
                    if (fn != organization)
                        oomph(vcard).append('<div class="iwmf_org">' + org + ' ' + organization + ' ' + organizationunit + '</div>');
                    oomph(vcard).append('<div class="iwmf_email"><a href="mailto:' + email + '">' + email + '</a></div>');
                    oomph(vcard).append('<div class="iwmf_title">' + role + ' ' + title + '</div>');
                    if (url) {
                        var urldesc = url;
                        if (url.length > 40)
                            urldesc = urldesc.substr(0, 36) + "...";
                        oomph(vcard).append('<div class="iwmf_url"><a class="iwmf_url" target="_blank" href=' + url + '>' + urldesc + '</a></div>');
                    }
                    oomph(vcard).append('<div class="iwmf_streetaddress">' + streetaddress + ' ' + extendedaddress + ' ' + postofficebox + '</div>');
                    oomph(vcard).append('<span class="iwmf_locality">' + locality + '</span> ');
                    oomph(vcard).append('<span class="iwmf_region">' + region + '</span> ');
                    oomph(vcard).append('<span class="iwmf_postal-code">' + postalcode + '</span> ');
                    oomph(vcard).append('<span class="iwmf_country-name">' + countryname + '</span>');
                    if (workphone)
                        oomph(vcard).append('<div class="iwmf_phone">Work: ' + workphone + ' </div>');
                    if (workfax)
                        oomph(vcard).append('<div class="iwmf_phone">Fax: ' + workfax + ' </div>');
                    if (homephone)
                        oomph(vcard).append('<div class="iwmf_phone">Home: ' + homephone + ' </div>');
                    if (cellphone)
                        oomph(vcard).append('<div class="iwmf_phone">Cell: ' + cellphone + ' </div>');
                    if (pager)
                        oomph(vcard).append('<div class="iwmf_phone">Pager: ' + pager + ' </div>');


                    var netBarHCard = oomph('<ul class="iwmf_netBar" ></ul>');
                    //IE bug: querystring freaks out rendering
                    var iconOutlook = oomph('<li  title="Export to Outlook" class="iwmf_iconOutlook"><a href="' + buildvCardURL(encodeURIComponent(fn), encodeURIComponent(additionalname), encodeURIComponent(familyname), encodeURIComponent(givenname), encodeURIComponent(nameprefix), encodeURIComponent(namesuffix), encodeURIComponent(nickname), encodeURIComponent(organization + ' ' + organizationunit), encodeURIComponent(role), encodeURIComponent(title), encodeURIComponent(email), encodeURIComponent(note), encodeURIComponent(streetaddress + ' ' + extendedaddress + ' ' + postofficebox), encodeURIComponent(region), encodeURIComponent(locality), encodeURIComponent(postalcode), encodeURIComponent(countryname), encodeURIComponent(photo), encodeURIComponent(workphone), encodeURIComponent(workfax), encodeURIComponent(homephone), encodeURIComponent(cellphone), encodeURIComponent(pager), encodeURIComponent(url), encodeURIComponent(bday), encodeURIComponent(latitude), encodeURIComponent(longitude), encodeURIComponent(category), encodeURIComponent(rev), encodeURIComponent(uid), encodeURIComponent(mailer)) + '"><img src="http://visitmix.com/university/stories3/oomph/images/outlook.png"/></a></li>');
                    var iconYahoo = oomph('<li class="iwmf_iconYahoo" title="Export to Yahoo" ><a target="_blank" href="' + buildYahooContactURL(encodeURIComponent(fn), encodeURIComponent(organization), encodeURIComponent(email), encodeURIComponent(url)) + '"><img src="http://visitmix.com/university/stories3/oomph/images/yahoo.png"/></a></li>');
                    var iconApple = oomph('<li class="iwmf_iconApple"><a  title="Export to Apple" href="' + buildvCardURL(encodeURIComponent(fn), encodeURIComponent(additionalname), encodeURIComponent(familyname), encodeURIComponent(givenname), encodeURIComponent(nameprefix), encodeURIComponent(namesuffix), encodeURIComponent(nickname), encodeURIComponent(organization + ' ' + organizationunit), encodeURIComponent(role), encodeURIComponent(title), encodeURIComponent(email), encodeURIComponent(note), encodeURIComponent(streetaddress + ' ' + extendedaddress + ' ' + postofficebox), encodeURIComponent(region), encodeURIComponent(locality), encodeURIComponent(postalcode), encodeURIComponent(countryname), encodeURIComponent(photo), encodeURIComponent(workphone), encodeURIComponent(workfax), encodeURIComponent(homephone), encodeURIComponent(cellphone), encodeURIComponent(pager), encodeURIComponent(url), encodeURIComponent(bday), encodeURIComponent(latitude), encodeURIComponent(longitude), encodeURIComponent(category), encodeURIComponent(rev), encodeURIComponent(uid), encodeURIComponent(mailer)) + '"><img src="http://visitmix.com/university/stories3/oomph/images/apple.png"/></a></li>');

                    //var iconOutlook = oomph('<li class="iwmf_iconOutlook"><a href="' + buildvCardURL(encodeURIComponent(fn), encodeURIComponent(additionalname), encodeURIComponent(familyname), encodeURIComponent(givenname), encodeURIComponent(nameprefix), encodeURIComponent(namesuffix), encodeURIComponent(nickname), encodeURIComponent(organization + ' ' + organizationunit), encodeURIComponent(role), encodeURIComponent(title), encodeURIComponent(email), encodeURIComponent(note), encodeURIComponent(streetaddress + ' ' + extendedaddress + ' ' + postofficebox), encodeURIComponent(region), encodeURIComponent(locality), encodeURIComponent(postalcode), encodeURIComponent(countryname), encodeURIComponent(photo), encodeURIComponent(workphone), encodeURIComponent(workfax), encodeURIComponent(homephone), encodeURIComponent(cellphone), encodeURIComponent(pager), encodeURIComponent(url), encodeURIComponent(bday), encodeURIComponent(latitude), encodeURIComponent(longitude), encodeURIComponent(category), encodeURIComponent(rev), encodeURIComponent(uid), encodeURIComponent(mailer)) + '"></a></li>');
                    //var iconYahoo = oomph('<li class="iwmf_iconYahoo"><a target="_blank" href="' + buildYahooContactURL(encodeURIComponent(fn),encodeURIComponent(organization),encodeURIComponent(email),encodeURIComponent(url)) + '"></a></li>');
                    //var iconApple = oomph('<li class="iwmf_iconApple"><a href="' + buildvCardURL(encodeURIComponent(fn), encodeURIComponent(additionalname), encodeURIComponent(familyname), encodeURIComponent(givenname), encodeURIComponent(nameprefix), encodeURIComponent(namesuffix), encodeURIComponent(nickname), encodeURIComponent(organization + ' ' + organizationunit), encodeURIComponent(role), encodeURIComponent(title), encodeURIComponent(email), encodeURIComponent(note), encodeURIComponent(streetaddress + ' ' + extendedaddress + ' ' + postofficebox), encodeURIComponent(region), encodeURIComponent(locality), encodeURIComponent(postalcode), encodeURIComponent(countryname), encodeURIComponent(photo), encodeURIComponent(workphone), encodeURIComponent(workfax), encodeURIComponent(homephone), encodeURIComponent(cellphone), encodeURIComponent(pager), encodeURIComponent(url), encodeURIComponent(bday), encodeURIComponent(latitude), encodeURIComponent(longitude), encodeURIComponent(category), encodeURIComponent(rev), encodeURIComponent(uid), encodeURIComponent(mailer)) + '"></a></li>');

                    //events netbar
                    //why the order matters is perplexing
                    oomph(netBarHCard).append(iconYahoo);
                    oomph(netBarHCard).append(iconOutlook);
                    oomph(netBarHCard).append(iconApple);


                    if (photo)
                        oomph(vCardContainer).append('<div class="iwmf_photo"><img width="50" height="50" src="' + photo + '"/></div>');

                    oomph(vCardContainer).append(vcard);
                    oomph(vCardContainer).append(netBarHCard);
                    oomph(vCards).append(vCardContainer);
                    //add geoinfo to to array for mapping; if no geo, add address and geocode it later
                    if (latitude && longitude) {
                        geoinfos.push({ lat: latitude, lon: longitude, name: fn });
                    }
                    else {
                        // addresses.push({ location: streetaddress + " " + locality + " " + region + " " + postalcode + " " + countryname, name: fn });
                        if (streetaddress || locality || region || countryname)
                            addresses.push({ location: streetaddress + ", " + locality + ", " + region + ", " + postalcode + ", " + countryname, name: fn });
                    }
                    hCardCount = hCardCount + 1;
                });
            }


            function phoneHelper(type, hCard) {
                //var selector = ".tel:has(.type:contains(" + type + "))";
                var selector = ".tel>.type:contains(" + type + ")";
                var div = hCard.find(selector).parent();
                //type could be hiding in a value-title
                if (div.length == 0) {
                    div = hCard.find(".tel .type .value-title[title=" + type + "]").parent().parent();
                }

                var val = "";
                //look for value-title
                var subDiv = div.find('.value-title');
                if (subDiv.length > 0) {
                    //if we find two value-titles one must be for type so grab the second
                    if (subDiv.length > 1)
                        return subDiv[1].attr('title');

                    else {
                        if (!subDiv.parent().is(".type"))
                            return subDiv.attr('title');
                    }
                }

                //no value title so look for value
                var newSubDiv = div.find('.value');
                if (newSubDiv.length == 1) {
                    val = newSubDiv.text();
                    return val;

                }
                else if (newSubDiv.length > 1) {
                    for (var i = 0; i < newSubDiv.length; i++) {
                        val = val + newSubDiv[i].innerText;
                    }
                    return val;
                }
                else

                    return div.find("*:nth-child(0)").text();


            }

            function dateHelper(type, hCalendar) {
                var result = hCalendar.find("." + type + ">.value");
                if (result) {
                    if (result.length > 1) {
                        var concatResult = "";
                        for (var i = 0; i < result.length; i++) {
                            //add T
                            if (i == 1)
                                concatResult = concatResult + "T";
                            if (result[i].getAttribute("title"))
                                concatResult = concatResult + result[i].getAttribute("title");
                            else
                                concatResult = concatResult + result[i].innerText;
                        }
                        return concatResult;
                    }
                    else if (result.length == 1)
                        return result.attr("title");
                }

                result = hCalendar.find("." + type + ">.value-title").attr('title');
                if (!result)
                    result = hCalendar.find("." + type).attr('title');
                if (!result)
                    result = hCalendar.find("." + type).text();

                return result;
            }

            function findAndParseHCalendars() {

                var hCalendarCount = 0;
                if (oomph(hCalendarCollection).length == 0) {
                    return;
                }

                oomph(hCalendarCollection).each(function() {
                    var hCalendar = oomph(this);


                    var summary = hCalendar.find('.summary').text();
                    if (summary.length < 1)
                        summary = hCalendar.find('.summary').attr('title');
                    var description = hCalendar.find('.description:first').text();
                    if (description.length > 150) {
                        description = description.substr(0, 147)
                        description = description + "...";
                    }
                    var location = hCalendar.find('.location').text();


                    var url = hCalendar.find('.url').attr('href');
                    if (url == null)
                        hCalendar.find('.url>a').attr('href');
                    if (url)
                        url = qualifyHREF(url);

                    var latitude;
                    var longitude;
                    if (hCalendar.find('.geo').length > 0) {
                        latitude = hCalendar.find('.latitude').attr('title');
                        longitude = hCalendar.find('.longitude').attr('title');
                        if (!latitude) {
                            latitude = hCalendar.find('.latitude').text();
                            longitude = hCalendar.find('.longitude').text();

                        }

                    }

                    var dtstart = dateHelper("dtstart", hCalendar);
                    var dtend = dateHelper("dtend", hCalendar);
                    //deal with case where it finds an attribute but there's nothing in there
                    //in that case we'll make it null and the rest of the code will work
                    if (dtstart) {
                        if (dtstart.length == 0)
                            dtstart = null;
                    }
                    if (dtend) {
                        if (dtend.length == 0)
                            dtend = null;
                    }
                    //look for value and value-title

                    if (dtstart) {

                        var dtstart_iso = normalizeISO8601(dtstart, true);
                        var dtstart_iso_nopunc = normalizeISO8601(dtstart, false);
                        var dtstart_date = dateFromISO8601(dtstart_iso);
                    }
                    if (dtend) {
                        var dtend_iso = normalizeISO8601(dtend, true);
                        var dtend_iso_nopunc = normalizeISO8601(dtend, false);
                        var dtend_date = dateFromISO8601(dtend_iso);
                    }




                    //ui elements
                    if (hCalendarCount == 0)
                        var vEventContainer = oomph('<li class="iwmf_vEventContainer"></li>').show();
                    else {
                        //bug in Safari/Chrome that doesn't allow us to call hide
                        //var vEventContainer = oomph('<li class="iwmf_vEventContainer"></li>').hide();
                        var vEventContainer = oomph('<li class="iwmf_vEventContainer"></li>').css({ 'display': 'NONE' });
                    }
                    var number = oomph('<div class="iwmf_number" ></div>');
                    var vevent = oomph('<div class="iwmf_vEvent" ></div>');
                    oomph(vevent).append('<div class="iwmf_summary">' + summary + '</div>');
                    if (dtstart)
                        oomph(vevent).append('<abbr class="iwmf_dtstart">' + dtstart_date.toLocaleString() + '</abbr>');

                    if (dtend)
                        oomph(vevent).append('<abbr class="iwmf_dtend">' + '<br/>' + 'to &nbsp;' + dtend_date.toLocaleString() + '</abbr>');

                    oomph(vevent).append('<div class="iwmf_location">' + location + '</div>');
                    if (url) {
                        var urldesc = url;
                        if (url.length > 40)
                            urldesc = urldesc.substr(0, 36) + "...";

                        oomph(vevent).append('<div class="iwmf_url"><a class="iwmf_url"  target="_blank" href=' + url + '>' + urldesc + '</a></div>');
                    }
                    oomph(vevent).append('<div class="iwmf_description">' + description + '</div>');


                    var netbar = oomph('<ul class="iwmf_netBar"></ul>');
                    var iconOutlook = oomph('<li class="iwmf_iconOutlook"><a title="Export to Outlook" href="' + buildiCalendarURL(dtstart_iso_nopunc, dtend_iso_nopunc, encodeURIComponent(location), encodeURIComponent(summary), encodeURIComponent(description)) + '">o</a></li>');
                    var iconLive = oomph('<li class="iwmf_iconLive"><a target="_blank"  title="Export to Windows Live" href="' + buildWindowsLiveCalendarURL(encodeURIComponent(summary), dtstart_iso, dtend_iso, encodeURIComponent(location), encodeURIComponent(description)) + '"></a></li>');
                    var iconGoogle = oomph('<li class="iwmf_iconGoogle"><a target="_blank" title="Export to Google"  href="' + buildGoogleCalendarURL(encodeURIComponent(summary), dtstart_iso_nopunc, dtend_iso_nopunc, encodeURIComponent(location), encodeURIComponent(description)) + '"></a></li>');
                    var iconYahoo = oomph('<li class="iwmf_iconYahoo"><a target="_blank"  title="Export to Yahoo" href="' + buildYahooCalendarURL(encodeURIComponent(summary), dtstart_iso_nopunc, dtend_iso_nopunc, encodeURIComponent(location), encodeURIComponent(description), encodeURIComponent(url)) + '"></a></li>');
                    var iconApple = oomph('<li class="iwmf_iconApple"><a  title="Export to Apple" href="' + buildiCalendarURL(dtstart_iso_nopunc, dtend_iso_nopunc, encodeURIComponent(location), encodeURIComponent(summary), encodeURIComponent(description)) + '"></a></li>');
                    var icon30b = oomph('<li class="iwmf_icon30b"><a target="_blank"  title="Export to 30 Boxes" href="' + build30BoxesCalendarURL(encodeURIComponent(summary), dtstart, dtend, encodeURIComponent(location), encodeURIComponent(description), encodeURIComponent(url)) + '"></a></li>');


                    //events netbar
                    oomph(netbar).append(iconOutlook);
                    oomph(netbar).append(iconLive);
                    oomph(netbar).append(iconGoogle);
                    oomph(netbar).append(iconYahoo);
                    oomph(netbar).append(iconApple);
                    oomph(netbar).append(icon30b);


                    //events
                    oomph(vEventContainer).append(number);
                    oomph(vEventContainer).append(vevent);
                    oomph(vEventContainer).append(netbar);
                    oomph(vEvents).append(vEventContainer);



                    if (latitude && longitude) {
                        geoinfos.push({ lat: latitude, lon: longitude, name: summary });
                    }
                    else {
                        if (location)
                            addresses.push({ location: location, name: summary });
                    }



                    hCalendarCount = hCalendarCount + 1;

                });


            }

        });
}

function oomph_checkJQuery() {
    if (typeof (jQuery) != 'undefined') {
        if (jQuery.ready) {
            startoomph();
        }
    }
    else setTimeout(oomph_checkJQuery, 1000);
}


oomph_checkJQuery();
