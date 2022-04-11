package com.example

data class User(
    val username: String,
    val passHash: String,
    val content: List<String> = mutableListOf()
)
