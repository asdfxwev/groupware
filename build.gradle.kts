plugins {
    id("java")
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "org.example"
version = "1.0-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot Starters
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    // mysql
    runtimeOnly("com.mysql:mysql-connector-j")

    // Lombok
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // QueryDSL - Java용 설정
    implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
    implementation("com.querydsl:querydsl-core:5.0.0")
    annotationProcessor("com.querydsl:querydsl-apt:5.0.0:jakarta")
    annotationProcessor("jakarta.annotation:jakarta.annotation-api")
    annotationProcessor("jakarta.persistence:jakarta.persistence-api")

    // DevTools
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

// QueryDSL Q클래스 생성 위치 설정
sourceSets {
    main {
        java {
            srcDirs("build/generated/sources/annotationProcessor/java/main")
        }
    }
}

// Clean 시 QueryDSL Q클래스 제거
tasks.named("clean") {
    doLast {
        file("build/generated").deleteRecursively()
    }
}

// 프론트엔드 빌드 자동화
val frontendDir = file("frontend")
val npm = if (System.getProperty("os.name").lowercase().contains("windows")) "npm.cmd" else "npm"

tasks.register<Exec>("npmInstall") {
    description = "frontend npm 패키지 설치"
    workingDir = frontendDir
    commandLine(npm, "install")
    inputs.file("$frontendDir/package-lock.json")
    outputs.dir("$frontendDir/node_modules")
}

tasks.register<Exec>("buildFrontend") {
    description = "frontend Vite 빌드"
    dependsOn("npmInstall")
    workingDir = frontendDir
    commandLine(npm, "run", "build")
    inputs.dir("$frontendDir/src")
    inputs.files("$frontendDir/login.html", "$frontendDir/board.html", "$frontendDir/vite.config.ts")
    outputs.dir("src/main/resources/static")
}

tasks.named("processResources") {
    dependsOn("buildFrontend")
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    mainClass.set("com.example.groupware.GroupwareApplication")
}

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    mainClass.set("com.example.groupware.GroupwareApplication")
}