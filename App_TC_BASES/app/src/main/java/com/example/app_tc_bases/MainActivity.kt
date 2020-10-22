package com.example.app_tc_bases

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.View
import android.widget.TextView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.example.app_tc_bases.ui.login.EXTRA_USER
import com.example.app_tc_bases.ui.login.LoginActivity
import com.google.android.material.textfield.TextInputEditText
import kotlinx.android.synthetic.main.fragment_feedback.*
import com.example.app_tc_bases.data.LoginRepository as LoginRepository1

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var userInfo :ArrayList<String>
    // intent = Intent(this, AnotherActivity::class.java)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        userInfo = intent.getStringArrayListExtra(EXTRA_USER) as ArrayList<String>
        println(userInfo)

        val fab: FloatingActionButton = findViewById(R.id.fab)
        // Botton of message
        fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show()
        }
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        val navController = findNavController(R.id.nav_host_fragment)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(setOf(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow), drawerLayout)
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)

        val userFullName = userInfo.get(2) + " " + userInfo.get(4) + " " + userInfo.get(5)
        val user = userInfo.get(10)
        val textViewName :TextView = findViewById<TextView>(R.id.text_View_Name)
        textViewName.setText(userFullName).toString()
        val textViewUser :TextView = findViewById<TextView>(R.id.text_View_User)
        textViewUser.setText(user).toString()

        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

    fun setName(View: View){
        val textViewName :TextView = findViewById<TextView>(R.id.text_View_Name)
        textViewName.setText("userFullName").toString()
    }

    fun passActivity(view: View){
        val intent = Intent(this, AnotherActivity::class.java)
        // start your next activity or in this case to sign in activity view
        startActivity(intent)
    }

    fun endActivity(view: View){
        finish()

        val intent = Intent(this, LoginActivity::class.java)
        // start your next activity or in this case to sign in activity view
        startActivity(intent)
    }

}