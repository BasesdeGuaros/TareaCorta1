package com.example.app_tc_bases.ui.feedback

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProviders
import com.example.app_tc_bases.R
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.textfield.TextInputEditText
import kotlinx.android.synthetic.main.fragment_feedback.*


class FeedbackFragment : Fragment() {

    private lateinit var feedbackViewModel: FeedbackViewModel
    private lateinit var textInputFeedback :TextInputEditText

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        feedbackViewModel =
                ViewModelProviders.of(this).get(FeedbackViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_feedback, container, false)
        val textView: TextView = root.findViewById(R.id.text_slideshow)
        textInputFeedback = root.findViewById(R.id.textInputFeedback)
        val feedbackImageButton :ImageButton = root.findViewById(R.id.feedbackImageButton)

        feedbackImageButton.setOnClickListener{
            view?.let { it1 -> sendFeedback(it1) }
        }

        //slideshowViewModel.text.observe(viewLifecycleOwner, Observer {
        //    textView.text = it
        //})
        return root
    }

    fun sendFeedback(view: View){
        val textFeedback = textInputFeedback.text.toString()
        if (textFeedback == "") {
            Snackbar.make(view, "Por favor escriba su comentario antes de pulsar el botón", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show()
        }
        else{
            println(textFeedback)
            Snackbar.make(view, textFeedback, Snackbar.LENGTH_LONG)
                .setAction("Action", null).show()

        }

    }


}