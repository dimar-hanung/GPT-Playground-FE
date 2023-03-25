import { ref, type ComputedRef, type Ref } from 'vue'

export const useStream = ({ payload }: { payload?: ComputedRef<Record<any, any>> | Ref }) => {
  const data = ref<Array<String>>([])
  const isLoading = ref(false)
  const execute = async () => {
    data.value = []
    isLoading.value = true
    // Query your endpoint
    const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/gpt-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(payload?.value ?? {})
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

          let res
          try {
            res = JSON.parse(dataString?.split('data: ')?.[1])
          } catch {
            res = { text: '' }
          }
          //   console.log(res?.choices?.[0]?.text)
          data.value.push(res?.choices?.[0]?.text ?? '')

          if (res.error) {
            console.error('Error while generating content: ' + res?.message)
          } else {
            result = res.streamHead ? res.text : result + res.text
            return readChunk()
          }
        } else {
          console.log('done')
          isLoading.value = false
        }
      })
    }

    await readChunk()
  }

  return {
    data,
    isLoading,
    execute
  }
}
