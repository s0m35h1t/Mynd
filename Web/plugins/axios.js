export default function ({
  $axios,
  store
}) {
  $axios.onRequest((config) => {
    config.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkyMzA2NTAzLCJleHAiOjE1OTQ4OTg1MDN9.Tt_M4L17ZqQdQHDXonzVi3NDTUK72Pb2yYYfas6HMtI"
  })
}
