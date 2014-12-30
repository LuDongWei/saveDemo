module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            files: ["src/**/*.css"]
        },
        jshint: {
            files: ["src/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        transport: {
            options: {
                handlebars: {
                    id: 'gallery/handlebars/1.0.0/handlebars'
                }
            }
        },
        replace: {
            domains: {
                src: ["dist/**/*.js", "dist/**/*.css"],
                overwrite: true,
                replacements: [{
                    from: ".mbaobao.cn",
                    to: ".mbaobao.com"
                }, {
                    from: ".mbaobao.test",
                    to: ".mbaobao.com"
                }, {
                    from: ".mshop.cn",
                    to: ".mbaobao.com"
                }]
            }
        },
        "ftp-deploy": {
            test: {
                auth: {
                    host: '192.168.152.175',
                    port: "21",
                    authKey: 'ftp175'
                },
                src: "dist",
                dest: '/web/mshop/static/cca.mbaobao.com/static/mod/<%=pkg.family%>/<%=pkg.name%>/<%=pkg.version%>'
            },
            release: {
                auth: {
                    host: '10.7.7.11',
                    port: "58421",
                    authKey: 'ftp34'
                },
                src: 'dist',
                dest: '/cca.mbaobao.com/static/mod/<%=pkg.family%>/<%=pkg.name%>/<%=pkg.version%>'
            }
        }
    });

    require("grunt-mbb-build").init(grunt)

    grunt.loadNpmTasks('grunt-mbb-build');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-csslint");

    grunt.registerTask("build", ["csslint", "jshint", "mbb-build"])
    grunt.registerTask("deploy", ["build", "replace:domains", "ftp-deploy:release"]);
    grunt.registerTask("test", ["build", "ftp-deploy:test"]);

};