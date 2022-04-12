package com.example.routing

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.example.User
import com.example.jwtAudience
import com.example.jwtIssuer
import com.example.jwtSecret
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.security.MessageDigest
import java.util.*

val users = mutableListOf<User>()

fun generateToken(user: String): String = JWT.create()
    .withAudience(jwtAudience)
    .withIssuer(jwtIssuer)
    .withClaim("user", user)
    .withExpiresAt(Date(System.currentTimeMillis() + 5 * 60 * 1000)) // 5 mins
    .sign(Algorithm.HMAC256(jwtSecret))

fun hash(pass: String) = MessageDigest
    .getInstance("SHA-256")
    .digest(pass.toByteArray())
    .joinToString("") { "%02x".format(it) }

fun Application.userLoginRouting() {
    routing {
        post("/login") {
            val user = call.request.queryParameters["user"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            val password = call.request.queryParameters["pass"] ?: return@post call.respond(HttpStatusCode.BadRequest)

            if (users.none {
                    it.username == user &&
                    it.passHash == hash(password)
            }) return@post call.respond(HttpStatusCode.Unauthorized)

            call.respond(generateToken(user))
        }

        post("/register") {
            val user = call.request.queryParameters["user"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            val password = call.request.queryParameters["pass"] ?: return@post call.respond(HttpStatusCode.BadRequest)

            if (users.any { it.username == user }) return@post call.respond(HttpStatusCode.Forbidden)

            users.add(
                User(
                    user,
                    hash(password)
                )
            )

            call.respond(generateToken(user))
        }
    }
}