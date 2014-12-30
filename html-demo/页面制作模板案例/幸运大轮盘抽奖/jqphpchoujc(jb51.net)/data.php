<?php   
/**
 * 获得责任编辑名称
 *
 * @version        $Id: adminname.lib.php 2 8:48 2010年7月8日Z tianya $
 * @package        DedeCMS.Taglib
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */

 /**
 *  获得责任编辑名称
 *
 * @access    public
 * @param     object  $ctag  解析标签
 * @param     object  $refObj  引用对象
 * @return    string  成功后返回解析后的标签内容
 */
 
 /*>>dede>>
<name>责任编辑</name> 
<type>仅内容模板</type> 
<for>V55,V56,V57</for>
<description>获得责任编辑名称</description>
<demo>
{dede:adminname /}	
</demo>
<attributes>
</attributes> 
>>dede>>*/

$prize_arr = array( 
    '0' => array('id'=>1,'min'=>1,'max'=>29,'prize'=>'一等奖','v'=>1), 
    '1' => array('id'=>2,'min'=>302,'max'=>328,'prize'=>'二等奖','v'=>2), 
    '2' => array('id'=>3,'min'=>242,'max'=>268,'prize'=>'三等奖','v'=>5), 
    '3' => array('id'=>4,'min'=>182,'max'=>208,'prize'=>'四等奖','v'=>7), 
    '4' => array('id'=>5,'min'=>122,'max'=>148,'prize'=>'五等奖','v'=>10), 
    '5' => array('id'=>6,'min'=>62,'max'=>88,'prize'=>'六等奖','v'=>25), 
    '6' => array('id'=>7,'min'=>array(32,92,152,212,272,332), 
'max'=>array(58,118,178,238,298,358),'prize'=>'七等奖','v'=>50) 
); 
function getRand($proArr) { 
    $result = ''; 
 
    //概率数组的总概率精度 
    $proSum = array_sum($proArr); 
 
    //概率数组循环 
    foreach ($proArr as $key => $proCur) { 
        $randNum = mt_rand(1, $proSum); 
        if ($randNum <= $proCur) { 
            $result = $key; 
            break; 
        } else { 
            $proSum -= $proCur; 
        } 
    } 
    unset ($proArr); 
 
    return $result; 
} 


foreach ($prize_arr as $key => $val) { 
    $arr[$val['id']] = $val['v']; 
} 
 
$rid = getRand($arr); //根据概率获取奖项id 
 
$res = $prize_arr[$rid-1]; //中奖项 
$min = $res['min']; 
$max = $res['max']; 
if($res['id']==7){ //七等奖 
    $i = mt_rand(0,5); 
    $result['angle'] = mt_rand($min[$i],$max[$i]); 
}else{ 
    $result['angle'] = mt_rand($min,$max); //随机生成一个角度 
} 
$result['prize'] = $res['prize']; 
 
echo json_encode($result); 
