new Vue({
    el: '#app',
    data: {
        url: 'https://www.youtube.com/watch?v=klnvttPfOUM',
        kataKunci: '',
        daftarHasil: [],
        paginasi: {
            first: null,
            last: null,
            prev: null,
            next: null,
            total: 0,
            page: null
        },
        year: new Date().getFullYear()
    },
    watch: {
        kataKunci: async function tanganiKataKunci(kataKunci) {
            if (kataKunci && kataKunci.length >= 3) {
                await this.cari(kataKunci, this.url)
            } else {
                this.bersihkanHasilDanPaginasi()
            }
        },
    },
    methods: {
        async cari(kataKunci, url, paginasi) {
            try {
                const respon = await fetch(
                paginasi
                    ? paginasi
                    : `https://cari-teks-video-api.vercel.app/api/search?q=${kataKunci}&url=${encodeURIComponent(
                        url
                    )}`
                ).then(_ => (_.ok ? _.json() : []))

                this.daftarHasil = respon.data
                this.paginasi.first = respon.first
                this.paginasi.last = respon.last
                this.paginasi.prev = respon.prev
                this.paginasi.next = respon.next
                this.paginasi.total = respon.total
                this.paginasi.page = respon.page
            } catch (error) {}
        },
        async navigasi(type) {
            if (!this.paginasi[type]) {
                return
            }
            await this.cari(this.kataKunci, this.url, this.paginasi[type])
        },
        bersihkan() {
            this.kataKunci = ''
            this.bersihkanHasilDanPaginasi()
        },
        bersihkanHasilDanPaginasi() {
            this.daftarHasil = []
            this.paginasi = {
                first: null,
                last: null,
                prev: null,
                next: null,
                total: 0,
                page: null
            }
        }
    }
})