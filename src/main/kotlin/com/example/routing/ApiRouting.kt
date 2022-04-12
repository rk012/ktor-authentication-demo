package com.example.routing

import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.apiRouting() {
    routing {
        route("/api") {
            install(ContentNegotiation) {
                json()
            }

            authenticate("user-auth-jwt") {
                // Endpoint to test if jwt token is valid
                get("/validate_token") {
                    call.respond(HttpStatusCode.NoContent)
                }
            }
        }
    }
}