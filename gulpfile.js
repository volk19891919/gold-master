let preprocessor = 'sass', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
	fileswatch = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch } = pkg

import browserSync from 'browser-sync'
import bssi from 'browsersync-ssi'
import ssi from 'ssi'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import sassglob from 'gulp-sass-glob'
const sass = gulpSass(dartSass)
import less from 'gulp-less'
import lessglob from 'gulp-less-glob'
import styl from 'gulp-stylus'
import stylglob from 'gulp-noop'
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'
import rename from 'gulp-rename'
import rsync from 'gulp-rsync'
import del from 'del'
import webp from 'gulp-webp'

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/',
			middleware: bssi({ baseDir: 'app/', ext: '.html' })
		},
		ghostMode: { clicks: false },
		notify: false,
		online: true,
		// tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
	})
}

function scripts() {
	return src(['app/js/*.js', '!app/js/*.min.js'])
		.pipe(webpackStream({
			mode: 'production',
			performance: { hints: false },
			plugins: [
				new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }), // jQuery (npm i jquery)
			],
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
								plugins: ['babel-plugin-root-import']
							}
						}
					}
				]
			},
			optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: { format: { comments: false } },
						extractComments: false
					})
				]
			},
		}, webpack)).on('error', function handleError() {
			this.emit('end')
		})
		.pipe(rename('app.min.js'))
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src([`app/${preprocessor}/*.*`, `!app/${preprocessor}/_*.*`])
		.pipe(eval(`${preprocessor}glob`)())
		.pipe(eval(preprocessor)())
		.pipe(postCss([
			autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function images() {
	return src(['app/images/src/**/*'])
		.pipe(changed('app/images/dist'))
		.pipe(imagemin())
		.pipe(dest('app/images/dist'))
		.pipe(browserSync.stream())
}

function webp_img() {
	return src(['app/images/src/**/*'])
		.pipe(changed('app/images/dist'))
		.pipe(webp())
		.pipe(dest('app/images/dist'))
		.pipe(browserSync.stream())
}

function buildcopy() {
	return src([
		//'app/js/*',
		//'!app/js/app.js',
		//'app/css/*.*',
		'{app/js,app/css}/*.min.*',
		'app/images/favicon.*',
		'app/images/**/*.*',
		'!app/images/src/**/*',
		//'app/action.php',
		'app/fonts/**/*'
	], { base: 'app/' })
		.pipe(dest('dist'))
}

async function buildhtml() {
	let includes = new ssi('app/', 'dist/', '/**/*.html')
	includes.compile()
	del('dist/parts', { force: true })
}

async function cleandist() {
	del('dist/**/*', { force: true })
}

function deploy() {
	return src('dist/')
		.pipe(rsync({
			root: 'dist/',
			hostname: 'volk191z@volk191z.beget.tech',
			destination: 'ka-business.ru/public_html/development/gold-foton',
			// clean: true, // Mirror copy with file deletion
			include: [/* '*.htaccess' */], // Included files to deploy,
			exclude: ['**/Thumbs.db', '**/*.DS_Store'],
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
}

function startwatch() {
	watch(`app/${preprocessor}/**/*`, { usePolling: true }, styles)
	watch(['app/js/**/*.js', '!app/js/**/*.min.js'], { usePolling: true }, scripts)
	watch('app/images/src/**/*', { usePolling: true }, images)
	watch('app/images/src/**/*', { usePolling: true }, webp_img)
	watch(`app/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}

export { scripts, styles, images, webp_img, deploy }
export let assets = series(scripts, styles, images, webp_img)
export let build = series(cleandist, images, webp_img, scripts, styles, buildcopy, buildhtml)
export default series(scripts, styles, images, webp_img, parallel(browsersync, startwatch))
