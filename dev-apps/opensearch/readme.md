
docker run -it -v /Users/galamouy/lectures/Artlist_Nodejs/apps/api/logs/log/info.log:/var/log/input.log -v /Users/galamouy/lectures/Artlist_Nodejs/apps/countries-service/logs/log/info.log:/var/log/inputlog2.log --rm --name logstash --net opensearch_opensearch-net opensearchproject/logstash-oss-with-opensearch-output-plugin:7.16.2  -e LS_OPTS="--config.reload.automatic --config.reload.interval 20" -e LS_JAVA_OPTS="-Xms1024m -Xmx1024m" -e 'input {  
    file { 
      path => "/var/log/input.log"
      start_position => "beginning"
    }
    file { 
      path => "/var/log/inputlog2.log"
      start_position => "beginning"
    }    
 }   
  output {
   opensearch {
     hosts => ["http://opensearch-node1:9200"]
     index => "opensearch-logstash-docker-%{+YYYY.MM.dd}"
     ssl => false
     ssl_certificate_verification => false
   }
 }'