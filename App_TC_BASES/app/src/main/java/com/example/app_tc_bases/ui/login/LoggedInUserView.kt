package com.example.app_tc_bases.ui.login

/**
 * User details post authentication that is exposed to the UI
 */
data class LoggedInUserView(
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
    //... other data fields that may be accessible to the UI
)