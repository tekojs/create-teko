import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createTeko } from '@tekojs/core'
import { createExpressRouteHandler } from '@tekojs/http'
import { createTekoViteAssets } from '@tekojs/vite-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/build', express.static(path.resolve(__dirname, '../../public/build')))
app.use('/public', express.static(path.resolve(__dirname, '../../public')))

const teko = createTeko({
  root: path.resolve(__dirname, '..'),
  views: ['views'],
  components: ['views/components'],
  cache: true,
})

const assets = await createTekoViteAssets({
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: 'src/client/main.ts',
})

teko.share({
  appName: 'Teko App',
  $assets: assets,
})

app.get(
  '/',
  createExpressRouteHandler(teko, 'pages/home', async () => {
    return {
      user: { name: 'Jefte', loggedIn: true },
      posts: ['Post 1', 'Post 2', 'Post 3'],
    }
  })
)

app.listen(3333, () => {
  console.log('Teko app rodando em http://localhost:3333')
})