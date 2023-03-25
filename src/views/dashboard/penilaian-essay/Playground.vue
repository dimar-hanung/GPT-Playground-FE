<template>
  <div class="container mx-auto">
    <div>
      <div class="text-2xl">Prototype Penilaian Essay</div>

      <label for="" class="p-4 rounded-t bg-white block mt-8"
        >Pertanyaan <span class="text-red-700">*</span></label
      >
      <textarea
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full min-h-[200px] bg-blue-50"
        placeholder="Pertanyaan"
        v-model="form.pertanyaan"
        wrap="hard"
      ></textarea>

      <label for="" class="p-4 rounded-t bg-white block mt-8"
        >Jawaban Benar <span class="text-red-700">*</span></label
      >
      <textarea
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full min-h-[200px] bg-blue-50"
        wrap="hard"
        placeholder="Jawaban Benar"
        v-model="form.jawabanBenar"
      ></textarea>

      <label for="" class="p-4 rounded-t bg-white block mt-8"
        >Jawaban Mahasiswa <span class="text-red-700">*</span></label
      >
      <textarea
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full min-h-[200px] bg-blue-50"
        wrap="hard"
        placeholder="Jawaban Mahasisawa"
        v-model="form.jawabanMahasiswa"
      ></textarea>

      <!-- <v-button class="mt-4 px-8" @click="getAnswer">Kirim</v-button> -->
      <v-button class="mt-4 px-8" @click="getScore" :loading="isLoadingScore">Nilai</v-button>

      <div class="p-4 rounded-t bg-white mt-8 flex justify-between">
        <div>Penilaian AI ( 1 - 10 ):</div>
        <div class="text-xl text-sky-600">
          <font-awesome class="mr-2 cursor-pointer" :icon="['fa', 'thumbs-up']"></font-awesome>
          <font-awesome
            class="mr-2 cursor-pointer rotate-180"
            :icon="['fa', 'thumbs-up']"
          ></font-awesome>
        </div>
      </div>
      <div
        class="block p-4 outline-none transition-shadow rounded-b shadow-lg focus:shadow-2xl w-full bg-blue-50"
      >
        <div class="whitespace-pre-wrap">{{ scoreStream.join('') }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

const prompt = {
  animal: `create 10 list of animal, use bahasa indonesia for animal name,
          return in json array like this
        
            {
              "animal": "anjing",
              "classes": "mamalia",
            }
        
            All character values should be Strings.
        
          `
}

export default {
  data() {
    return {
      question: '',
      form: {
        pertanyaan: 'Sebutkan isi dari pancasila',
        jawabanBenar: `Pancasila ada 5: 
      1. Ketuhanan yang maha esa
      2. Kemanusiaan yang adil dan beradap
      3. persatuan indonesia
      4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan
      5 .keadilan sosial bagi seluruh rakyat indonesia`,
        jawabanMahasiswa: `1. Ketuhanan yang maha esa
      2. Kemanusiaan yang adil dan beradap
      3. persatuan indonesia
      4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan
      5 .keadilan sosial bagi seluruh rakyat indonesia
      6. kemakmuran yang sejahtera`
      },
      answer: [],
      isLoading: false,
      scoreStream: [] as string[],
      isLoadingScore: false,
      sidebar: [
        {
          title: 'Siapa rektor UT Sekarang?',
          pertanyaan: 'Siapa rektor UT Sekarang?',
          jawabanBenar:
            'Ojat Darojat ( jika jawab menggunakan kata awal, anggap saja benar dan beri nilai sempurna )',
          jawabanMahasiswa: 'Ojat Darojat'
        },
        {
          title: 'Pancasila',
          pertanyaan: 'Sebutkan isi dari pancasila',
          jawabanBenar: `Pancasila ada 5: 
      1. Ketuhanan yang maha esa
      2. Kemanusiaan yang adil dan beradap
      3. persatuan indonesia
      4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan
      5 .keadilan sosial bagi seluruh rakyat indonesia`,
          jawabanMahasiswa: `1. Ketuhanan yang maha esa
      2. Kemanusiaan yang adil dan beradap
      3. persatuan indonesia
      4. kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan perwakilan
      5 .keadilan sosial bagi seluruh rakyat indonesia
      6. kemakmuran yang sejahtera`
        },
        {
          title: 'Apakah jwt token harus di enkripsi? jelaskan',
          pertanyaan: `Apakah jwt token harus di enkripsi? jelaskan`,
          jawabanBenar: `JWT can be:
      
      signed (JWS - RFC7515)
      encrypted (JWE - RFC7516)
      signed then encrypted (this order is highly recommended). The whole JWS is the payload of the JWE
      encrypted then signed.
      It makes sense to encrypt a JWS if you want to keep sensitive information hidden from the bearer (client) or third parties.
      
      The real questions are: does the audience support JWE? If yes, which algorithms are supported?`,
          jawabanMahasiswa: `JWT (RFC7519) merupakan cara yang aman dan kompak untuk mengirimkan klaim dari penerbit ke audiens melalui HTTP. JWT dapat dienkripsi (JWE - RFC7516), ditandatangani (JWS - RFC7515), atau ditandatangani kemudian dienkripsi (urutan ini sangat disarankan). JWS secara keseluruhan menjadi payload dari JWE. Enkripsi JWS berguna jika Anda ingin menyembunyikan informasi sensitif dari pemegang token (klien) atau pihak ketiga. Namun, pertanyaan pentingnya adalah: Apakah audiens mendukung JWE? Jika ya, algoritma apa yang didukung?
      `
        }
      ]
    }
  },
  methods: {
    async getAnswer() {
      console.log(this.question)
      this.isLoading = true
      //  https://api-sia-dev.ut.ac.id/global-rest/api/chat-question
      //  http://localhost:3000/chat-question
      axios
        .post(`http://localhost:3000/chat-question`, {
          question: prompt.animal
        })
        .then((res) => {
          console.log(res.data)
          this.isLoading = false
          console.log('array', JSON.parse(res.data.result))

          // this.answer.push(res.data.result);
        })
        .catch((err) => {
          this.isLoading = false
          throw err
        })
    },
    async getScore() {
      this.scoreStream = []
      this.isLoadingScore = true
      const res = await fetch('https://ut-gpt.azurewebsites.net/chat-bot3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          pertanyaan: this.form.pertanyaan,
          jawabanBenar: this.form.jawabanBenar,
          jawabanMahasiswa: this.form.jawabanMahasiswa
        })
      })

      // Create a reader for the response body
      const reader = res?.body?.getReader()
      // Create a decoder for UTF-8 encoded text
      const decoder = new TextDecoder('utf-8')
      let result = ''
      // Function to read chunks of the response body
      const readChunk: any = async () => {
        return reader?.read().then(({ value, done }) => {
          if (!done) {
            const dataString = decoder.decode(value)
            console.log(dataString.slice(0, 10))
            let data
            try {
              // console.log(dataString?.split("data: ")?.[1]);
              data = JSON.parse(dataString?.split('data: ')?.[1])
              // console.log(data);
            } catch {
              data = { text: '' }
            }
            // console.log(data?.choices?.[0]?.text);
            this.scoreStream.push(data?.choices?.[0]?.text ?? '')

            if (data.error) {
              console.error('Error while generating content: ' + data.message)
            } else {
              result = data.streamHead ? data.text : result + data.text
              return readChunk()
            }
          } else {
            console.log('done')
            this.isLoadingScore = false
          }
        })
      }

      await readChunk()
    }
  }
}
</script>
