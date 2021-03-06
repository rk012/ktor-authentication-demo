package com.example.routing

import com.example.User
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.litote.kmongo.*

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

                route("/user"){
                    post {
                        val username = call.principal<JWTPrincipal>()!!.payload.getClaim("user").asString()
                        val userData = users
                            .find(User::username eq username)
                            .first()
                            ?.content
                            ?: return@post call.respond(HttpStatusCode.NotFound)

                        userData.add(call.receive())

                        users.updateOne(User::username eq username, User::content setTo userData)
                        call.respond(HttpStatusCode.Created)
                    }

                    get {
                        val username = call.principal<JWTPrincipal>()!!.payload.getClaim("user").asString()
                        val userData = users
                            .find(User::username eq username)
                            .first()
                            ?.content
                            ?: return@get call.respond(HttpStatusCode.NotFound)

                        call.respond(userData)
                    }

                    delete {
                        val username = call.principal<JWTPrincipal>()!!.payload.getClaim("user").asString()
                        val userData = users
                            .find(User::username eq username)
                            .first()
                            ?.content
                            ?: return@delete call.respond(HttpStatusCode.NotFound)

                        if (userData.remove(call.receive())) {
                            users.updateOne(User::username eq username, User::content setTo userData)
                            call.respond(HttpStatusCode.NoContent)
                        }
                        else
                            call.respond(HttpStatusCode.NotFound)
                    }
                }
            }
        }
    }
}