//Stores data about song entries in the imported playlist
class Song {
	constructor(title, artist, album, rawLen, explicit, track, disk) {
		this.title    = title;
		this.artist   = artist;
		this.album    = album;
		this.length   = rawLen;
		this.explicit = explicit;
		this.track    = track;
		this.disk     = disk;
	}

	//Mutators
	setTitle(inTitle)    {this.title    = inTitle;}
	setArtist(inArtist)  {this.artist   = inArtist;}
	setAlbum(inAlbum)    {this.album    = inAlbum;}
	setRawLen(inLen)     {this.length   = inLen;}
	makeExplicit()       {this.explicit = true;}
	makeNotExplicit()    {this.explicit = false;}
	setTrackNum(inVal)   {this.track    = inVal;}
	setDiskNum(inVal)    {this.disk     = inVal;}
	makeSingle()         {this.track    = 1;
						  this.disk     = 1;}

	//Accessors
	getTitle()   {return this.title;}
	getAlbum()   {return this.album;}
	getArtist()  {return this.artist;}
	isExplicit() {return this.explicit;}
	getTrack()   {return this.track;}
	getDisk()    {return this.disk;}
	getRawLen()  {return this.length;}  //Accesses the song length in seconds, returns an integer
	getLength()  {let outText = "";     //Accesses the song length in hh;mm;ss format, returns a string
				  let lenSec  = this.length;
				  let lenMin  = 0;
				  let lenHrs  = 0;
				  
				  lenMin = Math.floor(lenSec / 60);
				  lenSec = lenSec % 60;
				  lenHrs = Math.floor(lenMin / 60);
				  lenMin = lenMin % 60;
				  
				  if (lenHrs < 10) {outText += "0";}
				  outText += lenHrs;
				  outText += ":";
				  if (lenMin < 10) {outText += "0";}
				  outText += lenMin;
				  outText += ":";
				  if (lenSec < 10) {outText += "0";}
				  outText += lenSec;
				  
				  return outText;
				 };
};

var song1 = new Song("Shooting Star",      "MUNA",                 "MUNA",                            232, false, 11, 1);
var song2 = new Song("Where is Everyone?", "Lunar Vacation",       "Inside Every Fig is a Dead Wasp", 178, false, 4,  1);
var song3 = new Song("Lonesome Love",      "Mitski",               "Be the Cowboy",                   113, true,  5,  1);
var song4 = new Song("Geyser",             "Mitski",               "Be the Cowboy",                   121, false, 4,  1);
var song5 = new Song("Desde Que",          "Liquits",              "Jardín",                          217, false, 3,  1);
var song6 = new Song("Night Eyes",         "The Orion Experience", "Fever Dream",                     238, false, 3,  1);
var song7 = new Song("Memory",             "Warhaus",              "We Fucked a Flame into Being",    181, true,  7,  1);

var track1 = new Song("2+2=5",            "Radiohead", "Hail to the Theif", 199, false, 1, 1);
var track2 = new Song("I Might be Wrong", "Radiohead", "Amnesiac",          293, false, 5, 1);

var TDH_Week_5 = [song1, song2, song3, song4, song5, song6, song7];
var Radiohead_tries_to_do_math = [track1, track2];

//Split part of Mergesort
function sortList(list, attribute) {
	//Initialize the list to an empty state
	var outList = list;

	//If the list has length 0 or 1, then it is already sorted. Return the list
	if (outList.length <= 1) {return outList;}

	//Split the list into two even slices
	const mIndex = Math.floor(outList.length / 2);
	const lArr   = outList.slice(0, mIndex);
	const rArr   = outList.slice(mIndex);

	//Recursively sort each slice, then merge them together
	return merge( sortList(lArr, attribute), sortList(rArr, attribute), attribute );

}

//Merge part of Mergesort
function merge(lArr, rArr, att) {

	//Initialize empty data
	let mergeArr = [];
	let lIndex   =  0;
	let rIndex   =  0;

	//Iterate through the list being sorted
	while(lIndex < lArr.length && rIndex < rArr.length) {
		if (att == "title") {
		    //Separate title in alphabetical order
			if (lArr[lIndex].getTitle().localeCompare(rArr[rIndex].getTitle()) == -1) {
				mergeArr.push(lArr[lIndex++]);
			} else {
				mergeArr.push(rArr[rIndex++]);
			}

		} else if (att == "artist") {
		    //Separate artist in alphabetical order
		    if (lArr[lIndex].getArtist().localeCompare(rArr[rIndex].getArtist()) == -1) {
		        mergeArr.push(lArr[lIndex++]);
		    } else {
		        mergeArr.push(rArr[rIndex++]);
		    }

		} else if (att == "album") {
		    //Separate album in alphabetical order
   		    if (lArr[lIndex].getAlbum().localeCompare(rArr[rIndex].getAlbum()) == -1) {
		        mergeArr.push(lArr[lIndex++]);
		    } else if (lArr[lIndex].getAlbum() == rArr[rIndex].getAlbum()) {

                //If two songs come from the same album, sort them by track #
		        if (lArr[lIndex].getTrack() < rArr[rIndex].getTrack()) {
		            mergeArr.push(lArr[lIndex++]);
		        } else {
		            mergeArr.push(rArr[rIndex++]);
		        }

		    } else {
		        mergeArr.push(rArr[rIndex++]);
		    }

		} else if (att == "length") {
		    //Sort songs by raw length in seconds
		    if (lArr[lIndex].getRawLen() < rArr[rIndex].getRawLen()) {
		        mergeArr.push(lArr[lIndex++]);
		    } else {
		        mergeArr.push(rArr[rIndex++]);
		    }

		} else if (att == "explicit") {
		    //Sort songs by whether they are explicit, placing explicit songs first
		    if (lArr[lIndex].isExplicit() && !rArr[rIndex].isExplicit()) {
		        mergeArr.push(lArr[lIndex++]);
		    } else if (lArr[lIndex].isExplicit() && rArr[rIndex].isExplicit()) {

                //If two songs are both explicit, sort in alphabetical order by title
		        if (lArr[lIndex].getTitle().localeCompare(rArr[rIndex].getAlbum()) == -1) {
		            mergeArr.push(lArr[lIndex++]);
		        } else {
		            mergeArr.push(rArr[rIndex++]);
		        }

		    } else {
		        mergeArr.push(rArr[rIndex++]);
		    }

		} else if (att == "track") {
		    //Sort by track number
		    if (lArr[lIndex].getTrack() < rArr[rIndex].getTrack()) {
		        mergeArr.push(lArr[lIndex++]);
		    } else if (lArr[lIndex].getTrack() == rArr[rIndex].getTrack()) {

                //If two songs have the same track number, sort in alphabetical order by title
		        if (lArr[lIndex].getTitle().localeCompare(rArr[rIndex].getTitle()) == -1) {
		            mergeArr.push(lArr[lIndex++]);
		        } else {
		            mergeArr.push(rArr[rIndex++]);
		        }

		    } else {
		        mergeArr.push(rArr[rIndex++]);
		    }

		} else if (att == "disk") {
		    //Sort by disk number
		    if (lArr[lIndex].getDisk() < rArr[rIndex].getDisk()) {
                mergeArr.push(lArr[lIndex++]);
            } else if (lArr[lIndex].getDisk() == rArr[rIndex].getDisk()) {

                //If two songs share a disk number, sort in alphabetical order by title
                if (lArr[lIndex].getTitle().localeCompare(rArr[rIndex].getTitle()) == -1) {
                    mergeArr.push(lArr[lIndex++]);
                } else {
                    mergeArr.push(rArr[rIndex++]);
                }

            } else {
                mergeArr.push(rArr[rIndex++]);
            }
		}
	}

	//Should the end of one list be reached, append the entirety of the other
	return mergeArr.concat(lArr.slice(lIndex)).concat(rArr.slice(rIndex));
}

function makeTable() {
	//Access the URL of the playlist being accessed
	var playlistURL = document.getElementById("URLInput").value;
	document.getElementById("fullcontainer").style = "background-color:#ffffff";

	//Initialize data about the playlist to empty values, then store
	var playlistName = "";
	var creator = "";
	var totLen_seconds = 0;
	if (playlistURL == "https://open.spotify.com/playlist/1yvyZD1Pre71wLHbPMZOpz") {
		playlistName   = "TDH Week 5";
		creator        = "B";
		totLen_seconds = 978;
	} else if (playlistURL == "https://open.spotify.com/playlist/1YZGWnYZD6gZliYs7mSaTE") {
		playlistName   = "Radiohead tries to do math"
		creator        = "four-caddit";
		totLen_seconds = 480;
	}

	var len_seconds = 0;
	var len_minutes = 0;
	var len_hours   = 0;
	var lenString   = "";

	//Convert the playlist's raw length in seconds to a string hh;mm;ss
	if (totLen_seconds > 60) {
		len_minutes = Math.floor(totLen_seconds / 60);
		len_seconds = totLen_seconds % 60;
	}
	if (len_minutes > 60) {
		len_hours   = Math.floor(len_minutes / 60);
		len_minutes = len_minutes % 60;
	}
	
	if (len_hours < 10) {
		lenString += "0";
	}
	lenString += len_hours;
	lenString += ":";
	if (len_minutes < 10) {
		lenString += "0";
	}
	lenString += len_minutes;
	lenString += ":";
	if (len_seconds < 10) {
		lenString += "0";
	}
	lenString += len_seconds;
	//Display the playlist's title, creator, and length
	document.getElementById("outputHeader").innerHTML = playlistName + " by " + creator + ", length: " + lenString + "<br>";

	//Access the width of the window and scale the display width of the table accordingly
	var screen_width = window.innerWidth;
	var perc_list = [ 0,  0,  0,  0,  0,  0,  0,  0];
	var wid_list  = [10, 10, 10, 10, 10, 10, 10, 10];
	
	if (screen_width > 1310) {
		document.getElementById("docOutput").style = "";
		document.getElementById("playlistSpecs").style = "margin-left:0px;position:relative;background-color: #D4B8F2;display:flex;justify-content:center;";
		perc_list = [ 2,  4, 10, 10, 14,  9, 10,  5];
		wid_list  = [ 3,  8,  8, 12,  5,  5,  5,  5];
	} else if (screen_width > 1020) {
		document.getElementById("docOutput").style = "";
		document.getElementById("playlistSpecs").style = "margin-left:0px;position:relative;background-color: #D4B8F2;display:flex;justify-content:center;";
		perc_list = [ 2,  4, 10, 10, 14,  9, 10,  5];
		wid_list  = [ 3,  8,  8, 12,  5,  5,  5,  5];
	} else if (screen_width > 940) {
		document.getElementById("docOutput").style = "";
		document.getElementById("playlistSpecs").style = "margin-left:0px;position:relative;background-color: #D4B8F2;display:flex;justify-content:center;";
		perc_list = [ 2,  4, 12, 12, 20, 12, 13,  7];
		wid_list  = [ 3, 10, 10, 18,  5,  5,  5,  5];
	} else if (screen_width > 690) {
		document.getElementById("docOutput").style = "margin-top:175px;";
		document.getElementById("playlistSpecs").style = "height:150px;margin-left:0px;position:relative;display:flex;justify-content:center;background-color:#D4B8F2;";
		perc_list = [ 2,  4, 14, 13, 22, 15, 15,  7];
		wid_list  = [ 3, 12, 10, 20,  5,  5,  5,  5];
	} else if (screen_width > 540) {
		document.getElementById("docOutput").style = "margin-top:200px;";
		document.getElementById("playlistSpecs").style = "height:180px;margin-left:0px;position:relative;display:flex;justify-content:center;background-color:#D4B8F2;";
		perc_list = [ 2,  4, 14, 13, 22, 15, 15,  7];
		wid_list  = [ 3, 12, 10, 20,  5,  5,  5,  5];
	} else if (screen_width > 445) {
		document.getElementById("docOutput").style = "margin-top:260px;";
		document.getElementById("playlistSpecs").style = "height:250px;margin-left:0px;position:relative;display:flex;justify-content:center;background-color:#D4B8F2;";
		perc_list = [ 2,  4, 14, 13, 22, 15, 15,  7];
		wid_list  = [ 3, 12, 10, 20,  5,  5,  5,  5];
	} else {
		document.getElementById("docOutput").style = "margin-top:320px;";
		document.getElementById("playlistSpecs").style = "height:290px;margin-left:0px;position:relative;display:flex;justify-content:center;background-color:#D4B8F2;";
		perc_list = [ 2,  4, 14, 13, 22, 15, 15,  7];
		wid_list  = [ 3, 12, 10, 20,  5,  5,  5,  5];
	}

	//Create the key of the table as HTML elements
	var perc_offset = perc_list[0];
	var keyText  = '<p class="songNum" id="headNum" style="margin-left:' + perc_offset + '%;width:' + wid_list[0] + '%">#</p>';
	perc_offset += perc_list[1];
	keyText     += '<p class="songTit" id="headTit" style="margin-left:' + perc_offset + '%;width:' + wid_list[1] + '%">Title</p>';
	perc_offset += perc_list[2];
	if (document.getElementById("artist").checked)   {
		keyText += '<p class="songArt" id="headArt" style="margin-left:' + perc_offset + '%;width:' + wid_list[2] + '%">Artist</p>';
		perc_offset += perc_list[3];
	}
	if (document.getElementById("album").checked)    {
		keyText += '<p class="songAlb" id="headAlb" style="margin-left:' + perc_offset + '%;width:' + wid_list[3] + '%">Album</p>';
		perc_offset += perc_list[4];
	}
	if (document.getElementById("length").checked)   {
		keyText += '<p class="songLen" id="headLen" style="margin-left:' + perc_offset + '%;width:' + wid_list[4] + '%">Length</p>';
		perc_offset += perc_list[5];
	}
	if (document.getElementById("explicit").checked) {
		keyText += '<p class="songExp" id="headExp" style="margin-left:' + perc_offset + '%;width:' + wid_list[5] + '%">Explicit?</p>';
		perc_offset += perc_list[6];
	}
	if (document.getElementById("track").checked)    {
		keyText += '<p class="songTrk" id="headTrk" style="margin-left:' + perc_offset + '%;width:' + wid_list[6] + '%">T#</p>';
		perc_offset += perc_list[7];
	}
	if (document.getElementById("disk").checked)     {
		keyText += '<p class="songDsk" id="headDsk" style="margin-left:' + perc_offset + '%;width:' + wid_list[7] + '%">D#</p>';
	}
	keyText += '<br>';

	//Display the key of the table
	document.getElementById("outputKey").innerHTML = keyText;

	//Access the current playlist
	var currPlaylist;
	if (playlistName == "TDH Week 5") {
		currPlaylist = TDH_Week_5;
	} else if (playlistName == "Radiohead tries to do math") {
		currPlaylist = Radiohead_tries_to_do_math;
	}

	//Access the attribute that the playlist is being sorted by
	var sort_item = document.getElementById("sortMenu").value;

	//Mergesort the playlist if any attribute is specified, otherwise go in order of the indexes
	var sortPlaylist = currPlaylist;
	if (sort_item != "none") {
		sortPlaylist = sortList(currPlaylist, sort_item);
	}
	
	var finText= "";

	//Iterate through each song in the list, adding the info into the table based on the chosen attributes
	var x;
	for (x = 0; x < sortPlaylist.length; x++) {
		let currSongText = '<section class="songEntry" id="songEntry' + (x + 1) + '">';
				
		let offset = perc_list[0];
		currSongText += '<p class="songNum" id="songNum'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[0]+'%">'+(x+1)+'</p>';
		offset       += perc_list[1];
		currSongText += '<p class="songTit" id="songTit'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[1]+'%">'+sortPlaylist[x].getTitle()+'</p>';
		offset       += perc_list[2];
		if (document.getElementById("artist").checked)   {
			currSongText += '<p class="songArt" id="songArt'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[2]+'%">'+sortPlaylist[x].getArtist()+'</p>';
			offset += perc_list[3];
		}
		if (document.getElementById("album").checked)    {
			currSongText += '<p class="songAlb" id="songAlb'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[3]+'%">'+sortPlaylist[x].getAlbum()+'</p>';
			offset += perc_list[4];
		}
		if (document.getElementById("length").checked)   {
			currSongText += '<p class="songLen" id="songLen'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[4]+'%">'+sortPlaylist[x].getLength()+'</p>';
			offset += perc_list[5];
		}
		if (document.getElementById("explicit").checked) {
			if (sortPlaylist[x].isExplicit()) {
				currSongText += '<p class="songExp" id="songExt'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[5]+'%">Explicit</p>';
			} else {
				currSongText += '<p class="songExp" id="songExt'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[5]+'%">Not Explicit</p>';
			}
			offset += perc_list[6];
		}
		if (document.getElementById("track").checked)    {
			currSongText += '<p class="songTrk" id="songTrk'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[6]+'%">'+sortPlaylist[x].getTrack()+'</p>';
			offset += perc_list[7];
		}
		if (document.getElementById("disk").checked)     {
			currSongText += '<p class="songDsk" id="songDsk'+(x+1)+'" style="margin-left:'+offset+'%;width:'+wid_list[7]+'%">'+sortPlaylist[x].getDisk()+'</p>';
		}
		currSongText += '</section>'
		finText += currSongText;
	}

    //Display the playlist table
	document.getElementById("songTable").innerHTML = finText;

    let exportBar = document.getElementById("exportBar");

	let barOutput = "";
	barOutput += '<button type="button" id="savebutton" onclick="downloadList()">Save!</button>';

	document.getElementById("victim").innerHTML = "";

	exportBar.innerHTML = barOutput;
}

function updateDropdown() {
    //Check which of the possible attributes were selected by the user, storing them in booleans
	var artBool = document.getElementById("artist").checked;
	var albBool = document.getElementById("album").checked;	
	var lenBool = document.getElementById("length").checked;
	var dskBool = document.getElementById("disk").checked;
	var trkBool = document.getElementById("track").checked;
	var expBool = document.getElementById("explicit").checked;

    //Initialize the dropdown so that the user can always choose to sort by title, or not sort at all
	var text = '<option value="none">none</option><option value="title">Title</option>';

	//For each boolean, add that piece of information to the dropdown menu as a possible sort
	{
		if (artBool == true) {
			text += '<option value="artist">Artist</option>';
		}
	
		if (albBool == true) {
			text += '<option value="album">Album</option>';
		}
	
		if (lenBool == true) {
			text += '<option value="length">Length</option>';
		}
	
		if (expBool == true) {
			text += '<option value="explicit">Explicit?</option>';
		}
	
		if (trkBool == true) {
			text += '<option value="track">Track #</option>';
		}
	
		if (dskBool == true) {
			text += '<option value="disk">Disk #</option>'
		}
	}

	//Update the dropdown menu in the HTML
	document.getElementById("sortMenu").innerHTML = text;
}

function downloadList() {
    var playlistURL = document.getElementById("URLInput").value;
    document.getElementById("fullcontainer").style = "background-color:#ffffff";

    //Initialize data about the playlist to empty values, then store
    var playlistName = "";
    var creator = "";
    var totLen_seconds = 0;
    var currPlaylist = [];
    if (playlistURL == "https://open.spotify.com/playlist/1yvyZD1Pre71wLHbPMZOpz") {
    	playlistName   = "TDH Week 5";
    	creator        = "B";
    	totLen_seconds = 978;
    	currPlaylist   = TDH_Week_5;
    }
    else if (playlistURL == "https://open.spotify.com/playlist/1YZGWnYZD6gZliYs7mSaTE") {
    	playlistName   = "Radiohead tries to do math"
    	creator        = "four-caddit";
    	totLen_seconds = 480;
    	currPlaylist   = Radiohead_tries_to_do_math;
    }

    var len_seconds = 0;
    var len_minutes = 0;
    var len_hours   = 0;
    var lenString   = "";

    //Convert the playlist's raw length in seconds to a string hh;mm;ss
    if (totLen_seconds > 60) {
    	len_minutes = Math.floor(totLen_seconds / 60);
    	len_seconds = totLen_seconds % 60;
    }
    if (len_minutes > 60)    {
    	len_hours   = Math.floor(len_minutes / 60);
    	len_minutes = len_minutes % 60;
    }

    if (len_hours < 10)   {lenString += "0";}
    lenString += len_hours;
    lenString += ":";
    if (len_minutes < 10) {lenString += "0";}
    lenString += len_minutes;
    lenString += ":";
    if (len_seconds < 10) {lenString += "0";}
    lenString += len_seconds;

    //Access the attribute that the playlist is being sorted by
    var sort_item = document.getElementById("sortMenu").value;
    var sortPlaylist = currPlaylist;
    if (sort_item != "none") {
    	sortPlaylist = sortList(currPlaylist, sort_item);
    }

    var textString = maketxt([playlistName, creator, lenString], sortPlaylist);
    var link = document.createElement("a");
    var file = new Blob([textString], {type: "text/plain"});
    link.href = URL.createObjectURL(file);
    link.download = "" + playlistName + ".txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

function maketxt(playlistInfo, playlist) {
    let outstring = "";
    outstring += playlistInfo[0] + " by " + playlistInfo[1] + ", length: " + playlistInfo[2] + " - ";
    outstring += "Courtesy of Playlist2Print\n\n\n";

    var artBool = document.getElementById("artist").checked;
    var albBool = document.getElementById("album").checked;
    var lenBool = document.getElementById("length").checked;
    var dskBool = document.getElementById("disk").checked;
    var trkBool = document.getElementById("track").checked;
    var expBool = document.getElementById("explicit").checked;

    let x;
    for (x = 0; x < playlist.length; x++) {
        outstring += (x+1) + " - ";
        outstring += playlist[x].getTitle();
        if (artBool) {outstring += " by " + playlist[x].getArtist();}
        if (albBool) {outstring += ", from " + playlist[x].getAlbum();}
        if (lenBool) {outstring += " - " + playlist[x].getLength();}
        if (expBool) {if (playlist[x].isExplicit) {
                      outstring += ", Explicit.";
                      }else{
                      outstring += ", Not Explicit.";
        }}
        if (trkBool) {outstring += " Track " + playlist[x].getTrack();}
        if (dskBool) {outstring += " on disk " + playlist[x].getDisk();}
        outstring += "\n\n";
    }

    return outstring;
}