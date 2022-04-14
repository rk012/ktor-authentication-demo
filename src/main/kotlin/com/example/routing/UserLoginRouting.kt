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
import org.litote.kmongo.*

val db = KMongo.createClient().getDatabase("ktor_auth_demo")
val users = db.getCollection<User>()

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

            if (
                users
                    .find(and(
                        User::username eq user,
                        User::passHash eq hash(password)
                    ))
                    .first()
                == null
            ) return@post call.respond(HttpStatusCode.Unauthorized)

            call.respond(generateToken(user))
        }

        post("/register") {
            val user = call.request.queryParameters["user"] ?: return@post call.respond(HttpStatusCode.BadRequest)
            val password = call.request.queryParameters["pass"] ?: return@post call.respond(HttpStatusCode.BadRequest)

            if (
                users
                    .find(
                        User::username eq user
                    )
                    .first()
                != null
            ) return@post call.respond(HttpStatusCode.Forbidden)

            users.insertOne(
                User(
                    user,
                    hash(password)
                )
            )

            call.respond(generateToken(user))
        }
    }
}