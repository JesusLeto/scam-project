import fs from "fs/promises"


class SongsService {

    allSongsArr
    songsNameArr

    constructor() {
        this.allSongsArr = []
        this.songsNameArr = []
    }

    async getRecommendSongs(phrase) {
        const resArr = []

        await this.getSongs();

        this.allSongsArr.forEach(song => {
            let includeNotFound = true
            song.split("\n").forEach((songString, index,currentSong) => {
                if (songString.toLowerCase().includes(phrase.toLowerCase()) && includeNotFound) {
                    const partSongWithPhrase = []
                    let partIndex = index
                    while (partSongWithPhrase.length !== 3) {
                        if (partIndex > 0 && partSongWithPhrase.length === 0) {
                            partIndex--;
                            if (currentSong[partIndex] && !currentSong[partIndex].startsWith("[")) {
                                partSongWithPhrase.push(currentSong[partIndex])
                            }
                        } else if (partSongWithPhrase.length === 0 || (partSongWithPhrase.length === 1 && partSongWithPhrase[0] !== songString)) {
                            partSongWithPhrase.push(songString)
                            partIndex = index
                        } else {
                            partIndex++
                            if (partIndex < currentSong.length && currentSong[partIndex] && !currentSong[partIndex].startsWith("[")) {
                                partSongWithPhrase.push(currentSong[partIndex])
                            }
                        }
                    }
                    resArr.push({
                        partSongWithPhrase, currentSong
                    })
                    includeNotFound = false
                }
            })
        })

        return resArr
    }

    async getSongs() {
        this.allSongsArr = []
        try {
            this.songsNameArr = await fs.readdir("./data/songs");

            for (let songName of this.songsNameArr) {
                const resultReadSongFile = await fs.readFile(`./data/songs/${songName}`, "utf-8");
                this.allSongsArr.push(resultReadSongFile)
            }

        } catch (e) {
            throw new Error("Read file error")
        }
    }
}

export default new SongsService()
