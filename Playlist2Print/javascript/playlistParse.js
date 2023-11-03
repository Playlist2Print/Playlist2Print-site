function getInfo() {
	
	var playlistURL = document.getElementById("URLInput").value;
	var getArtist   = document.getElementById("artist").checked;
	var getAlbum    = document.getElementById("album").checked;
	var getLength   = document.getElementById("length").checked;
	var getDiskNum  = document.getElementById("disk").checked;
	var getTrackNum = document.getElementById("track").checked;
	var getExplicit = document.getElementById("explicit").checked;
					
	var playlistName = "";
	var creator = "";
	var totLen_seconds = 0;
	if (playlistURL == "https://open.spotify.com/playlist/1yvyZD1Pre71wLHbPMZOpz") {
		playlistName   = "TDH Week 5";
		creator        = "B";
		totLen_seconds = 7689;
	} else if (playlistURL == "https://github.com/Asmoranomardicadaistinaculdicar/Playlist2Print-site") {
		playlistName   = "Radiohead tries to do Math"
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
	
	
}