var gulp = require("gulp");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var useref = require("gulp-useref");
var filter = require("gulp-filter");
var uglify = require("gulp-uglify");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");

gulp.task("default",function(){
    var jsFilter = filter("**/*.js",{restore: true});
    var cssFilter = filter("**/*.css",{restore: true});
    var indexHtmlFilter = filter(["**/*","!**/index.html"],{restore: true});

    // var imgFilter = filter(["**/*.png","**/*.jpg","**/*.ico"],{restore: true});

    gulp.src("src/index.html")
        .pipe(useref())

		.pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)

        .pipe(cssFilter)
        .pipe(csso())
		.pipe(cssFilter.restore)

        .pipe(indexHtmlFilter)
		.pipe(rev())
        .pipe(indexHtmlFilter.restore)

        .pipe(revReplace())

        .pipe(gulp.dest("dist"));


    gulp.src("src/img/*.{jpg,png,gif,ico}")
        // .pipe(imgFilter)
        .pipe(imagemin()) // 压缩图片
        // .pipe(imgFilter.restore)
        .pipe(gulp.dest("dist/img"));

});
