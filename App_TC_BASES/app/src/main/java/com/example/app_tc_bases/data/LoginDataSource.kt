package com.example.app_tc_bases.data

import com.example.app_tc_bases.data.model.LoggedInUser
import java.io.IOException

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class LoginDataSource {

    private val testUser = LoggedInUser("305130462", "Elias","Arce",
        "Mendez", "Cartago", "Central", "Dulce Nombre", "27",
        "10", "1998", "85518595", "delias2798@hotmail.com", "123456")
    val users = mutableListOf<LoggedInUser>(testUser)

    fun login(username: String, password: String): Result<LoggedInUser> {

        if (username == testUser.user && password == testUser.password) {
            try {
                return Result.Success(testUser)

                // val fakeUser = LoggedInUser(java.util.UUID.randomUUID().toString(), "Jane Doe")
                // TODO: handle loggedInUser authentication
            } catch (e: Throwable) {
                return Result.Error(IOException("Error logging in", e))
            }
        }
        else
            return Result.Error(IOException("Error with user or password"))
    }

    fun logout() {
        // TODO: revoke authentication
    }
}