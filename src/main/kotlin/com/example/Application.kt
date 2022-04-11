package com.example

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.compression.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

const val jwtAudience = "http://0.0.0.0:8080/u/*"
const val jwtIssuer = "http://0.0.0.0:8080"

// Randomly generate JWT secret key everytime server starts
val jwtSecret = (1..64).map { (('a'..'z')+('A'..'Z')+('0'..'9')).random() }.joinToString("")

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        install(Authentication) {
            jwt("user-auth-jwt") {
                realm = "User authentication"
                verifier(JWT
                    .require(Algorithm.HMAC256(jwtSecret))
                    .withAudience(jwtAudience)
                    .withIssuer(jwtIssuer)
                    .build()
                )

                validate { credential ->
                    if (credential.payload.getClaim("user").asString() != "") {
                        JWTPrincipal(credential.payload)
                    } else {
                        null
                    }
                }
                
                challenge { _, realm ->
                    call.respond(HttpStatusCode.Unauthorized, "Token for $realm is invalid or has expired")
                }
            }
        }

        install(Compression) {
            gzip()
        }

        userRouting()

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
