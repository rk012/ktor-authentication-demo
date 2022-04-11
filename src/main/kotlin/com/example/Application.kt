package com.example

import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {

        routing {
            static {
                resource("/", "react-build/index.html")
                resource("*", "react-build/index.html")
                static("dist") {
                    resources("react-build")
                }

                resource("/{...}", "react-build/index.html")
            }
        }
    }.start(wait = true)
}
