class Song {
	#title;
	#artist;
	#album;
	#length;
	#explicit;
	#track;
	#disk;
	
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
	isExplicit() {return this.explicit;}
	getTrack()   {return this.track;}
	getDisk()    {return this.disk};
	getRawLen()  {return this.len};
	getLength()  {let outText = "";
				  let lenSec  = this.len;
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

var song1 = new Song("Shooting Star", "MUNA", "MUNA", 232, false, 11, 1);
var song2 = new Song("Where is Everyone?", "Lunar Vacation", "Inside Every Fig is a Dead Wasp", 178, false, 4, 1);
var song3 = new Song("Lonesome Love", "Mitski", "Be the Cowboy", 113, true, 5, 1);
var song4 = new Song("Desde Que", "Liquits", "Jardín", 217, false, 3, 1);
var song5 = new Song("Night Eyes", "The Orion Experience", "Fever Dream", false, 3, 1);

var track1 = new Song("2 + 2 = 5", "Radiohead", "Hail to the Theif", 199, false, 1, 1);
var track2 = ["I Might be Wrong", "Radiohead", "Amnesiac", 293, false, 5, 1];

var TDH_Week_5 = [song1, song2, song3, song4, song5];
var Radiohead_tries_to_do_math = [track1, track2];

function getInfo() {
	
	var playlistURL = document.getElementById("URLInput").value;
					
	var playlistName = "";
	var creator = "";
	var totLen_seconds = 0;
	if (playlistURL == "https://open.spotify.com/playlist/1yvyZD1Pre71wLHbPMZOpz") {
		playlistName   = "TDH Week 5";
		creator        = "B";
		totLen_seconds = 7689;
	} else if (playlistURL == "https://github.com/Asmoranomardicadaistinaculdicar/Playlist2Print-site") {
		playlistName   = "Radiohead tries to do math"
		creator        = "four-caddit";
		totLen_seconds = 480;
	}
					
	var len_seconds = 0;
	var len_minutes = 0;
	var len_hours   = 0;
	var lenString   = "";
					
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
	document.getElementById("outputHeader").innerHTML = playlistName + " by " + creator + ", length: " + lenString + "<br>";
	
	let currPlaylist;
	if (playlistName === "TDH Week 5") {
		currPlaylist = TDH_Week_5;
	} else if (playlistName === "Radiohead tries to do math") {
		currPlaylist = Radiohead_tries_to_do_math;
	}
	
	alert("Playlist length: " + currPlaylist.length + " songs");
}

function updateDropdown() {
	var artBool = document.getElementById("artist").checked;
	var albBool = document.getElementById("album").checked;	
	var lenBool = document.getElementById("length").checked;
	var dskBool = document.getElementById("disk").checked;
	var trkBool = document.getElementById("track").checked;
	var expBool = document.getElementById("explicit").checked;
	
	var text = '<option value="none">none</option>';
	
	{
		if (artBool === true) {
			text += '<option value="artist">Artist</option>';
		}
	
		if (albBool === true) {
			text += '<option value="album">Album</option>';
		}
	
		if (lenBool === true) {
			text += '<option value="length">Song Length</option>';
		}
	
		if (expBool === true) {
			text += '<option value="explicit">Explicit?</option>';
		}
	
		if (trkBool === true) {
			text += '<option value="track">Track #</option>';
		}
	
		if (dskBool === true) {
			text += '<option value="explicit">Disk #</option>'
		}
	}
	
	document.getElementById("sortMenu").innerHTML = text;
}
