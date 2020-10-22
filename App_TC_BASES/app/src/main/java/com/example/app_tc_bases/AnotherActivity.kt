package com.example.app_tc_bases

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.app_tc_bases.ui.login.EXTRA_USER

class AnotherActivity : AppCompatActivity() {

    private lateinit var userInfo :ArrayList<String>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_another)

        //userInfo = intent.getStringArrayListExtra(EXTRA_USER) as ArrayList<String>
        //println(userInfo)
    }

    fun cancel_Change_Register(view: View){
        finish()
    }

}