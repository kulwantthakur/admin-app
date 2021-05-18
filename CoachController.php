<?php

namespace App\Http\Controllers;
use App\Models\Coach;
use App\Models\HeadCoaches;
use App\User;
use Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CoachController extends Controller
{

    public function createCoach(Request $request) {
	
		$coach = new Coach;
		$coach->status = $request->status;
		$coach->first_name = $request->first_name;
		$coach->last_name = $request->last_name;
		$coach->email = $request->email;
		$coach->phone = $request->phone;
		$coach->licenses = $request->licenses;
		$coach->invite = $request->invite;
		$coach->head_coach_id = $request->head_coach_id;

	    $token = Str::random(14);
		
		$coach->token = $token;


 		$data = array('first_name' => $request->first_name, 'token' => $token);
		$em = [
			'to' => $request->email,
			'from' =>  'noreply@adminapp.com'
		];
		Mail::send('mails/coach-email-notification', $data, function ($message) use ($em) {
			$message->to($em['to'], 'Subscribed to a plan')->subject('New Team Member');
			//	$message->from($em['from'], 'adminapp.com');
		});

		$coach->save();

		return response()->json([
			"message" => "Coach added Successfully"
		], 201);
	}
    public function getCoach($id) {
      $coachdata = Coach::find($id);  
		return response()->json([
			"data" => $coachdata
		], 201);
    }


    public function checkCoaches($token) 
	  {
	       	$coachdata = Coach::where('token', '=', $token)->first();
			if ($coachdata === null) 
			{	
			 return response(['errors'=>'Invalid token'], 422);			 
            }
			else
			{
            return response()->json([
				  "data" => $coachdata->id
			  ],201 );
			}
	  }



    public function getAllCoaches(Request $request) {
		$coachdata = Coach::all();
   		  return response()->json([
			  "data" => $coachdata
		  ], 201);
	  }

    public function getMyCoaches(Request $request,$id) {
    	if($id)
    	{
    		$coachdata = Coach::where('head_coach_id', '=', $id)->get();
    	}
         
       	 $headcoachdata = HeadCoaches::where('user_id', '=', $id)->first();

       	 if($headcoachdata)
       	 {
         
          $assistant_licences = $headcoachdata->assistant_licences;
         }
         else
         {
           $assistant_licences = '';
         }


    	  return response()->json([
			  "data" => $coachdata,
			  "assistant_licences" => $assistant_licences
		  ], 201);
	  }


    public function updateCoach(Request $request, $id) {
      // logic to update a Coach record goes here
        $coach = Coach::find($id);
		
        $coach->status = $request->status;
		$coach->first_name = $request->first_name;
		$coach->last_name = $request->last_name;
		$coach->email = $request->email;
		$coach->phone = $request->phone;
		$coach->password = $request->password;
		$coach->licenses = $request->licenses;
		$coach->invite = $request->invite;
		$coach->head_coach_id = $request->head_coach_id;
		$coach->save();

		return response()->json([
			"message" => "Coach record updated Successfully"
		], 201);
    }

    public function deleteCoach ($id) {
      // logic to delete a Coach record goes here
	    // $coach = Coach::find($id);
       
     //    $coach->delete();

		$coachdata = Coach::where('id', '=', $id)->first();
		
			if ($coachdata) {
		
		$user_id = $coachdata->user_id;

        $deletedRows = User::where('id', $user_id)->delete();

        }
        $deletedcoach = Coach::where('id', $id)->delete();
		return response()->json([
			"message" => "Coach has been delete successfully"
		], 201);
    }
}
