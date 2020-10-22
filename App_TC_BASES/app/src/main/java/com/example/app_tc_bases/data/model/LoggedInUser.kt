package com.example.app_tc_bases.data.model

/**
 * Data class that captures user information for logged in users retrieved from LoginRepository
 */
data class LoggedInUser(
    val userId: String,
    val displayName: String,
    val lastName1: String,
    val lastName2: String,
    val provincia: String,
    val canton: String,
    val distrito: String,
    val day: String,
    val month: String,
    val year: String,
    val phone: String,
    val user: String,
    val password: String
    )